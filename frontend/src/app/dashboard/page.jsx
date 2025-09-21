"use client"
import { useEffect, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { getColumns } from "./columns";
import getData from "./data";
import { DataTable } from "./data-table"
import SortTable from "./sort-table";
import { Modal } from "../components/Modal";
import Tasks from "../components/tasks";
import api from "@/lib/axios";
import { Spinner } from "../components/spinner";

export default function Page() {
  const [data, setData] = useState([]);
  const [pageParams, setPageParams] = useState({ currentPage: 1 })
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenModal = (rowData) => {
    if (openModal) setSelectedRow(null)
    setOpenModal(prev => !prev);
    setSelectedRow(rowData)
  }

  const handleFetchTasks = async () => {

    try {
      const res = await api.get("/get-tasks")
      if (res?.data?.code === 1 || res?.status === 200) {
        setData(res.data?.data?.data || [])
        delete res.data?.data?.data
        setPageParams({ ...res.data?.data })
      } else {
        setData([])
      }
    } catch (error) {
      console.log(error)
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
        console.log(res.data.data)
        setData(prev => prev.map(prevTask => prevTask.id === res.data.data.id ? { ...task, status: newStatus } : prevTask))
      } else {
        setData(prev => prev.map(prevTask => prevTask.id === task.id ? { ...task, status: prevStatus } : prevTask))
      }
    } catch (error) {
      console.error(error)
      setData(prev => prev.map(prevTask => prevTask.id === task.id ? { ...task, status: prevStatus } : prevTask))
    }
  }

  useEffect(() => {
    // (async () => {
    //   let data = await getData();
    //   setData(data)
    // })()
    handleFetchTasks()
  }, [])

  return (
    <AuthLayout>
      {isLoading && <div className="w-full h-full flex items-center justify-center">
        <Spinner spinnerColor={"border-prim"} />
      </div>}
      {data.length && (
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 ">
            <SortTable />
          </div>
          <DataTable columns={getColumns(handleOpenModal, handleUpdateTaskStatus)} data={data} />
          {openModal &&
            <Modal props={{
              open: openModal, onOpenChange: () => {
                setOpenModal(prev => !prev)
                setSelectedRow(null)
              }
            }}
            >
              <Tasks type="edit" data={selectedRow} />
            </Modal>
          }
        </div>
      )}
    </AuthLayout>
  );
}
