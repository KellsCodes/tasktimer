"use client"
import { useEffect, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { getColumns } from "./columns";
import getData from "./data";
import { DataTable } from "./data-table"
import SortTable from "./sort-table";
import { Modal } from "../components/Modal";
import Tasks from "../components/tasks";

export default function Page() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenModal = (rowData) => {
    setOpenModal(prev => !prev);
    setSelectedRow(rowData)
  }

  useEffect(() => {
    (async () => {
      let data = await getData();
      setData(data)
    })()
  }, [])

  return (
    <AuthLayout>
      <div className="flex flex-1 flex-col gap-4 p-4 bg-red-500">
        <div className="grid auto-rows-min gap-4 ">
          <SortTable />
        </div>
        <DataTable columns={getColumns(handleOpenModal)} data={data} />
        {openModal &&
          <Modal props={{ open: openModal, onOpenChange: () => { setOpenModal(prev => !prev) } }}>
            <Tasks type="edit" data={selectedRow} />
          </Modal>
        }
      </div>
    </AuthLayout>
  );
}
