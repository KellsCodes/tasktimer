import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { forwardRef, useImperativeHandle, useState } from "react"

import { ChevronDownIcon } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import api from "@/lib/axios"


const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd')
}

const Tasks = forwardRef(({ type, data, setIsSubmitting }, ref) => {

    const [open, setOpen] = useState(false)
    const [endTimeOpen, setEndTimeOpen] = useState(false)
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(null)
    const hours = [...Array(24).keys()]
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setMessage(null)
        setError(false)
    }

    const handleSubmit = async () => {
        if (!formData?.title || !formData?.startDate || !formData?.endDate || typeof formData?.startHour === 'undefined' || typeof formData?.endHour === 'undefined') {
            setMessage("Please enter all fields.")
            setError(true)
        } else {
            const now = new Date()
            const selectedStartTime = new Date(`${formData?.startDate}T${String(formData?.startHour).padStart(2, "0")}:00:00`);
            const selectedEndTime = new Date(`${formData?.endDate}T${String(formData?.endHour).padStart(2, "0")}:00:00`);
            /**
             * if now is greater than selectedStartTime, reject and display error
             * if now is greater than selectedEndTime, reject and display error
             * if selectedEndTime is greater than selectedStartTime, reject and display error
             * if selectedStartTime is equal to selectedEndTime, reject and display error
             * Otherwise, obtain user time zone and proceed to adding/updating task
             */
            if (now > selectedStartTime || now > selectedEndTime || selectedEndTime < selectedStartTime || selectedStartTime.getTime() === selectedEndTime.getTime()) {
                setMessage("Your selected dates aren’t valid. Make sure the start time is earlier than the end time, and that both are set in the future.")
                setError(true)
            } else {
                // set loading state, get timezone of user, check if adding or updating a task and use the appropriate api
                const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
                const userTask = { ...formData, timeZone: userTimeZone }
                setIsSubmitting(true)
                try {
                    const res = (type && type === "edit") ? await api.put("/update-task", userTask) : await api.post("/add-task", userTask)
                    if (res?.data?.code === 1 || res.status === 200) {
                        // set the task to task array
                        setError(false)
                        setMessage(res?.data?.message)
                    } else {
                        setError(true)
                        setMessage("An error occurred. Try again.")
                    }

                } catch (error) {
                    console.error(error)
                    setError(true)
                    setMessage(error?.response?.data?.message || "An error occurred. Try again.")
                }
            }
        }

        setIsSubmitting(false)
    }

    useImperativeHandle(ref, () => ({
        handleSubmit
    }))
    return (
        <div className="grid gap-y-7">
            <div className="grid gap-2">
                {message &&
                    <div className={`min-h-13 w-full p-3 bg-${error ? "red-500" : "prim"} opacity-70 text-sm flex items-center justify-center rounded-lg`}>{message}</div>
                }
                <label htmlFor="title">Title</label>
                <Input
                    id="title"
                    name="title"
                    value={formData?.title || ""}
                    onChange={handleChange}
                    className={''}
                    minLength={3}
                    maxLength={30}
                />
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col gap-3 w-1/2">
                    <Label htmlFor="startDate" className="px-1">
                        Starting Date
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="startDate"
                                name="startDate"
                                className="w-full justify-between font-normal"
                            >
                                {formData?.startDate ? formData?.startDate : "Select date"}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={formData?.startDate}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                    setFormData({ ...formData, startDate: formatDate(date) })
                                    setOpen(false)
                                    setMessage(null)
                                    setError(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                    <Label htmlFor="startHour" className="px-1">
                        Starting Time
                    </Label>
                    <Select
                        onValueChange={(value) => {
                            setFormData({ ...formData, startHour: value });
                            setMessage(null)
                            setError(false)
                        }}
                        value={formData?.startHour}
                        name="startHour"
                        id="startHour"
                    >
                        <SelectTrigger className="w-full lg:w-[150px]">
                            <SelectValue placeholder="Select hour (0-23)" />
                        </SelectTrigger>
                        <SelectContent>
                            {hours.map(hour => (
                                <SelectItem key={hour} value={hour}>{hour.toString().padStart(2, "0")}:00:00</SelectItem>

                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>


            <div className="flex gap-4">
                <div className="flex flex-col gap-3 w-1/2">
                    <Label htmlFor="endDate" className="px-1">
                        Ending Date
                    </Label>
                    <Popover open={endTimeOpen} onOpenChange={setEndTimeOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="endDate"
                                className="w-full justify-between font-normal"
                            >
                                {formData?.endDate ? formData?.endDate : "Select date"}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={formData?.endDate}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                    setFormData({ ...formData, endDate: formatDate(date) })
                                    setEndTimeOpen(false)
                                    setMessage(null)
                                    setError(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                    <Label htmlFor="endHour" className="px-1">
                        Ending Time
                    </Label>
                    <Select
                        onValueChange={(value) => {
                            setFormData({ ...formData, endHour: value });
                            setMessage(null)
                            setError(false)
                        }}
                        value={formData?.endHour}
                        name="endHour"
                        id="endHour"
                    >
                        <SelectTrigger className="w-full lg:w-[150px]">
                            <SelectValue placeholder="Select hour (0-23)" />
                        </SelectTrigger>
                        <SelectContent>
                            {hours.map(hour => (
                                <SelectItem key={hour} value={hour}>{hour.toString().padStart(2, "0")}:00:00</SelectItem>

                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
})

export default Tasks;