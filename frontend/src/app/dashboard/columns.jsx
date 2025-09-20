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

export const getColumns = (handleOpenModal) => {
    return [
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const data = row.original // row data
                const status = row.getValue("status")
                let colorClass = "text-gray-500"
                if (status === 3) {
                    colorClass = "text-green-500"
                } else if (status === 2) {
                    colorClass = "text-blue-500"
                } else if (status === 1) {
                    colorClass = "text-yellow-500"
                }
                return (
                    <>
                        {status === 3 ?
                            <div className={`p-1 flex items-center gap-x-1`}>
                                {
                                    status === 3 ?
                                        <IoMdCheckbox className={`${colorClass} text-[17px]`} /> :
                                        status === 2 ?
                                            <MdOutlineIncompleteCircle className={`${colorClass} text-[17px]`} />
                                            :
                                            <MdPending className={`${colorClass} text-[17px]`} />
                                }

                                <span className={`text-xs`}>{status}</span>
                            </div> :
                            <>
                                <Select defaultValue={status}>
                                    <SelectTrigger className="w-full lg:w-[155px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={1}>
                                            <MdPending className={`text-yellow-500 text-[17px]`} /> Pending
                                        </SelectItem>
                                        <SelectItem value={2}>
                                            <MdOutlineIncompleteCircle className={`text-blue-500 text-[17px]`} /> Running
                                        </SelectItem>
                                        <SelectItem value={3}>
                                            <IoMdCheckbox className={`text-prim text-[17px]`} /> Completed
                                        </SelectItem>
                                        <SelectItem value={4}>
                                            <MdCancel className={`text-[17px]`} /> Canceled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                            </>
                        }
                    </>
                )
            }
        },
        {
            accessorKey: "startAtUTC",
            header: "Start Time",
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
            header: "End Time",
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
            header: "Date Created",
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                                // console.log("Edit:", data)
                                handleOpenModal(data)
                            }}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => console.log("Delete:", data.id)}
                                className="text-red-500"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}