import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

import { ChevronDownIcon } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function Tasks({type, data}) {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [endTimeOpen, setEndTimeOpen] = useState(false)
    // console.log(type, data);
    return (
        <div className="grid gap-y-7">
            <div className="grid gap-2">
                <label htmlFor="name">Title</label>
                <Input id="title" name="title" value="" className={''} />
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col gap-3 w-1/2">
                    <Label htmlFor="StartTime" className="px-1">
                        Starting Date
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="startTime"
                                className="w-full justify-between font-normal"
                            >
                                {date ? date.toLocaleDateString() : "Select date"}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                    setDate(date)
                                    setOpen(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                    <Label htmlFor="time-picker" className="px-1">
                        Time
                    </Label>
                    <Input
                        type="time"
                        id="time-picker"
                        step="1"
                        defaultValue="10:30:00"
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                </div>
            </div>


            <div className="flex gap-4">
                <div className="flex flex-col gap-3 w-1/2">
                    <Label htmlFor="endTime" className="px-1">
                        Ending Date
                    </Label>
                    <Popover open={endTimeOpen} onOpenChange={setEndTimeOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="endTime"
                                className="w-full justify-between font-normal"
                            >
                                {date ? date.toLocaleDateString() : "Select date"}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                    setDate(date)
                                    setOpen(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                    <Label htmlFor="time-picker" className="px-1">
                        Time
                    </Label>
                    <Input
                        type="time"
                        id="time-picker"
                        step="1"
                        defaultValue="10:30:00"
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                </div>
            </div>
        </div>
    );
}