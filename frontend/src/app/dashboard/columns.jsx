"use client"

import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MdCancel, MdOutlineIncompleteCircle, MdPending } from "react-icons/md"
import { IoMdCheckbox } from "react-icons/io"


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
                if (status === "Completed") {
                    colorClass = "text-green-500"
                } else if (status === "Running") {
                    colorClass = "text-blue-500"
                } else if (status === "Pending") {
                    colorClass = "text-yellow-500"
                }
                return (
                    <>
                        {status === "Completed" ?
                            <div className={`p-1 flex items-center gap-x-1`}>
                                {
                                    status === "Completed" ?
                                        <IoMdCheckbox className={`${colorClass} text-[17px]`} /> :
                                        status === "Running" ?
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
                                        <SelectItem value="Pending">
                                            <MdPending className={`text-yellow-500 text-[17px]`} /> Pending
                                        </SelectItem>
                                        <SelectItem value="Completed">
                                            <IoMdCheckbox className={`text-prim text-[17px]`} /> Completed
                                        </SelectItem>
                                        <SelectItem value="Running">
                                            <MdOutlineIncompleteCircle className={`text-blue-500 text-[17px]`} /> Running
                                        </SelectItem>
                                        <SelectItem value="Canceled">
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
            accessorKey: "startTime",
            header: "Start Time",
            cell: ({ row }) => {
                const startTime = new Date(row.getValue("startTime"))
                return (
                    <span>
                        {startTime.toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </span>
                )
            }
        },
        {
            accessorKey: "endTime",
            header: "End Time",
            cell: ({ row }) => {
                const startTime = new Date(row.getValue("endTime"))
                return (
                    <span>
                        {startTime.toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </span>
                )
            }
        },
        {
            accessorKey: "createAt",
            header: "Date Created",
            cell: ({ row }) => {
                const startTime = new Date(row.getValue("createAt"))
                return (
                    <span>
                        {startTime.toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
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