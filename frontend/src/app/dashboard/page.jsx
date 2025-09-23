"use client"
import { useEffect, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { getColumns } from "./columns";
import { DataTable } from "./data-table"
import SortTable from "./sort-table";
import { Modal } from "../components/Modal";
import Tasks from "../components/tasks";
import api from "@/lib/axios";
import { Spinner } from "../components/spinner";
import { useRouter, useSearchParams } from "next/navigation"
import AppPagination from "../components/AppPagination";

export default function Page() {
  const [data, setData] = useState([]);
  const [pageParams, setPageParams] = useState({ currentPage: useSearchParams().get("page") || 1 })
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const router = useRouter()
  const search = useSearchParams().get("search")
  const status = useSearchParams().get("status")
  const startDate = useSearchParams().get("startDate")
  const endDate = useSearchParams().get("endDate")
  const [infoDisplay, setInfoDisplay] = useState(null) // Default=null, new users with no tasks on dashboard=1, search or filter with no record=2, error=3

  const handleOpenModal = (rowData) => {
    if (openModal) setSelectedRow(null)
    setOpenModal(prev => !prev);
    setSelectedRow(rowData)
  }

  const handleFetchTasks = async () => {
    try {
      const path = `/get-tasks?page=${pageParams.currentPage}&pageSize=15`
      const res = await api.get(path)
      if (res?.data?.code === 1 || res?.status === 200) {
        setData(res.data?.data?.data || [])
        // delete res.data?.data?.data
        setPageParams({
          currentPage: res.data?.data?.currentPage,
          totalPages: res.data?.data?.totalPages
        })
        // console.log(res.data?.data)
        if (parseInt(pageParams.currentPage) === 1 && res.data?.data?.data?.length < 1) {
          setInfoDisplay(1)
        } else if (
          (parseInt(pageParams.currentPage) > 1 ||
            isNaN(parseInt(pageParams.currentPage))
            || typeof parseInt(pageParams.currentPage) === "undefined")
          && (!res.data?.data?.data || res.data?.data?.data?.length < 1)) {
          setInfoDisplay(2)
        }
      } else {
        setData([])
        setInfoDisplay(2)
      }
    } catch (error) {
      console.error(error)
      setInfoDisplay(3)
    }
    setIsLoading(false)
  }

  const handleSearchTask = async () => {
    try {
      const path = `get-tasks?page=${pageParams.currentPage}&pageSize=15&search=${search}`
      const res = await api.get(path)
      if (res.status === 200) {
        setData(res.data?.data?.data)
        setPageParams({
          currentPage: res.data?.data?.currentPage,
          totalPages: res.data?.data?.totalPages
        })
        if (!res.data?.data?.data || res.data?.data?.data?.length < 1) {
          setInfoDisplay(2)
        }
      } else {
        setData([])
        setInfoDisplay(2)
      }
    } catch (error) {
      console.error(error)
      setInfoDisplay(3)
    }
    setIsLoading(false)
  }

  const handleTaskFilter = async () => {
    // filter-tasks?pageSize=15&status=1&startDate=2025-10-12&endDate=2025-10-13&page=1
    if (!status && !startDate && !endDate) return
    let apiURL = `/filter-tasks?pageSize=15&page=${pageParams.currentPage}`
    if (status) {
      apiURL += `&status=${status}`
    }
    if (startDate) {
      apiURL += `&startDate=${startDate}`
    }
    if (endDate) {
      apiURL += `&endDate=${endDate}`
    }
    try {
      const res = await api.get(apiURL)
      if (res.status === 200) {
        setData(res.data?.data?.data)
        setPageParams({
          currentPage: res.data?.data?.currentPage,
          totalPages: res.data?.data?.totalPages
        })
        if (!res.data?.data?.data || res.data?.data?.data?.length < 1) {
          setInfoDisplay(2)
        }
      } else {
        setData([])
        setInfoDisplay(2)
      }

    } catch (error) {
      console.error(error)
      setInfoDisplay(3)
    }
    setIsLoading(false)
  }

  const handleUpdateTaskStatus = async (task, newStatus) => {
    if ((task.status !== 1 && task.status !== 2)
      || (task.status === 2 && newStatus === 1)
      || (task.status === 1 && newStatus === 1)
      || (task.status === 2 && newStatus === 2)) return // we can display error later for nice user experience
    const prevStatus = task.status
    setData(prev => prev.map(prevTask => prevTask.id === task.id ? { ...task, status: newStatus } : prevTask))
    try {
      const res = await api.put("/update-task", { ...task, status: newStatus })
      if (res.status === 200 || res.data.code === 1) {
        setData(prev => prev.map(prevTask => prevTask.id === res.data.data.id ? { ...task, status: newStatus } : prevTask))
      } else {
        setData(prev => prev.map(prevTask => prevTask.id === task.id ? { ...task, status: prevStatus } : prevTask))
      }
    } catch (error) {
      console.error(error)
      setData(prev => prev.map(prevTask => prevTask.id === task.id ? { ...task, status: prevStatus } : prevTask))
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!taskId) return
    try {
      const res = await api.delete("/delete-task", { data: { id: taskId } })
      if (res.status === 200 || res.data?.code === 1) {
        setData(prev => prev.filter(task => task.id !== taskId))
      }
    } catch (error) {
      console.error(error)
    }
  }

  // get task localhost:5001/api/v1/get-tasks?page=1&pageSize=15
  // search for task localhost:5001/api/v1/get-tasks?page=1&pageSize=15&search=xender
  // filter task localhost:5001/api/v1/filter-tasks?pageSize=15&status=1&startDate=2025-10-12&endDate=2025-10-13&page=1

  useEffect(() => {
    if (search) {
      handleSearchTask()
    } else if (status || startDate || endDate) {
      handleTaskFilter()
    } else {
      handleFetchTasks()
    }
  }, [])

  useEffect(() => {
    if (data.length >= 1) {
      setInfoDisplay(null)
    }
  }, [data])


  return (
    <AuthLayout setData={setData}>
      {isLoading ?
        <div className="w-full h-full flex items-center justify-center">
          <Spinner spinnerColor={"border-prim"} />
        </div> : null
      }
      {/* For new accounds with no added task yet */}
      {
        infoDisplay === 1 || infoDisplay === 3 ?
          <div className="w-full h-full flex items-center justify-center">
            <div className="p-6 m-4 shadow-md rounded-md w-full md:w-[350px] h-auto flex flex-col items-center justify-center gap-y-4">
              <p className="font-sans text-sm font-bold text-center">Sept 23 2025, 10:12:45 AM</p>
              <p className="font-sans text-md font-medium text-center opacity-60">
                {infoDisplay === 1 ? "Start by adding a task — we’ll handle the reminders for you." : "The system encountered an error."}
              </p>
              <button
                onClick={() => {
                  if (infoDisplay === 3) {
                    window.location.href = "/dashboard"
                  } else {
                    setOpenModal(true)
                  }
                }}
                className={`p-2 rounded-md h-10 font-bold font-sans ${infoDisplay === 1 ? "bg-prim text-white w-[130px]" : "bg-gray-100 w-[150px]"} cursor-pointer text-sm`}
              >
                {infoDisplay === 1 ? "Add task" : "Get all tasks"}
              </button>
            </div>
          </div>
          : null
      }
      {/* For users with task but no search or filtered task returned */}
      {
        infoDisplay === 2 ?
          <div className="w-full h-full flex items-center justify-center">
            <div className="p-4 m-4 shadow-md rounded-md w-full lg:w-[300px] h-[150px] flex flex-col items-center justify-center gap-y-4">
              <p className="font-sans text-md font-bold">No record found.</p>
              <button
                onClick={() => window.location.href = "/dashboard"}
                className="p-2 rounded-md h-12 w-[150px] bg-gray-100 cursor-pointer text-sm"
              >
                Get all tasks
              </button>
            </div>
          </div>
          : null
      }
      {data.length >= 1 ? (
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 ">
            <SortTable
              setData={setData}
              router={router}
              searchQuery={search}
              filterStatus={status}
              taskStarts={startDate}
              taskEnds={endDate}
            />
          </div>
          <DataTable columns={getColumns(handleOpenModal, handleUpdateTaskStatus, handleDeleteTask)} data={data} />

          {pageParams?.totalPages && pageParams?.totalPages > 1 ?
            <AppPagination
              currentPage={parseInt(pageParams.currentPage) || 1}
              totalPages={parseInt(pageParams?.totalPages) || 1}
            /> : null
          }
        </div>
      ) : null}

      {/* Modal toggle */}
      {openModal &&
        <Modal props={{
          open: openModal, onOpenChange: () => {
            setOpenModal(prev => !prev)
            setSelectedRow(null)
          }
        }}
        >
          <Tasks type="edit" data={selectedRow} setData={setData} />
        </Modal>
      }

    </AuthLayout>
  );
}
