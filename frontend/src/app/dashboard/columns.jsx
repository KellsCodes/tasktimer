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
import { MdOutlineIncompleteCircle, MdPending } from "react-icons/md"
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className={`p-1 flex items-center gap-x-1 focus:outline-none cursor-pointer`}>
                                        {
                                            status === "Running" ?
                                                <MdOutlineIncompleteCircle className={`${colorClass} text-[17px]`} />
                                                :
                                                <MdPending className={`${colorClass} text-[17px]`} />
                                        }
                                        <span className={`text-xs`}>{status}</span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <RadioGroup defaultValue={`${status}`}>
                                        <DropdownMenuItem onClick={() => {
                                            // console.log("Edit:", data)
                                            // handleOpenModal(data)
                                        }}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Pending" id="Pending" />
                                                <Label htmlFor="Pending">Pending</Label>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => console.log("Delete:", data.id)}
                                            className=""
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Running" id="Running" />
                                                <Label htmlFor="Running">In Progress</Label>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => console.log("Delete:", data.id)}
                                            className=""
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Completed" id="Completed" />
                                                <Label htmlFor="Completed">Completed</Label>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => console.log("Delete:", data.id)}
                                            className=""
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Cancel" id="Cancel" />
                                                <Label htmlFor="Cancel">Cancel</Label>
                                            </div>
                                        </DropdownMenuItem>

                                    </RadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
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