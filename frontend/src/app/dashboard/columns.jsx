"use client"

import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MdCancel, MdOutlineIncompleteCircle, MdPending } from "react-icons/md"
import { IoMdCheckbox } from "react-icons/io"

/**
 * 
 * @STATUS IDENTIFICATION NUMBER:
 * 1 === Pending i.e just added task
 * 2 === Running i.e task has been started by the user
 * 3 === Completed i.e task has been completed by the user
 * 4 === Canceled i.e The user discontinued the task
 */

const statusOptionSelect = (status) => {
    const values = [1, 2, 3, 4]
    const selections = values.filter(value => value >= status).map(statusNumber => {
        if (statusNumber === 1) return <SelectItem key={statusNumber} value={statusNumber}><MdPending className={`text-yellow-500 text-[17px]`} /> Pending</SelectItem>
        if (statusNumber === 2) return <SelectItem key={statusNumber} value={statusNumber}><MdOutlineIncompleteCircle className={`text-blue-500 text-[17px]`} /> Running</SelectItem>
        if (statusNumber === 3) return <SelectItem key={statusNumber} value={statusNumber}><IoMdCheckbox className={`text-prim text-[17px]`} /> {status === 3 ? "Completed" : "Complete"}</SelectItem>
        if (status === 1 || status === 2 || status === 4) return <SelectItem key={statusNumber} value={statusNumber}><MdCancel className={`text-[17px]`} /> {status === 4 ? "Cancelled" : "Cancel"}</SelectItem>
    })
    return selections

}

export const getColumns = (handleOpenModal, handleUpdateTaskStatus, handleDeleteTask) => {
    return [
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status")
                return (
                    <Select
                        defaultValue={status}
                        onValueChange={(value) => {
                            if (row.original.status === 2 && value === 1) return
                            handleUpdateTaskStatus(row.original, value)
                        }
                        }
                    >
                        <SelectTrigger className="w-full lg:min-w-[155px] lg:max-w-[155px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptionSelect(status)}
                        </SelectContent>
                    </Select>
                )
            }
        },
        {
            accessorKey: "startAtUTC",
            header: "Starts",
            cell: ({ row }) => {
                const startTime = new Date(row.getValue("startAtUTC"))
                return (
                    <span>
                        {startTime.toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                            hour12: true,
                            timeZone: row.original.timeZone
                        })}
                    </span>
                )
            }
        },
        {
            accessorKey: "endAtUTC",
            header: "Ends",
            cell: ({ row }) => {
                const startTime = new Date(row.getValue("endAtUTC"))
                return (
                    <span>
                        {startTime.toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                            hour12: true,
                            timeZone: row.original.timeZone
                        })}
                    </span>
                )
            }
        },
        {
            accessorKey: "createdAt",
            header: "Created",
            cell: ({ row }) => {
                const startTime = new Date(row.getValue("createdAt"))
                return (
                    <span>
                        {startTime.toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                            hour12: true,
                            timeZone: row.original.timeZone
                        })}
                    </span>
                )
            }
        },
        {
            id: "actions", // use id not accessorKey since it's not a real field
            header: "Actions",
            cell: ({ row }) => {
                const data = row.original // row data
                return (
                    <>
                        {data.status !== 3 ?
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {data.status === 1 ?
                                        <DropdownMenuItem onClick={() => {
                                            handleOpenModal(data)
                                        }}
                                        >
                                            Edit
                                        </DropdownMenuItem> : null
                                    }
                                    {[1, 2, 4].includes(data.status) ?
                                        <DropdownMenuItem
                                            onClick={() => handleDeleteTask(data.id)}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </DropdownMenuItem> : null
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu> : null
                        }
                    </>
                )
            },
        },
    ]
}