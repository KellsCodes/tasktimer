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
          <DataTable columns={getColumns(handleOpenModal)} data={data} />
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
