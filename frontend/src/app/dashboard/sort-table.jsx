import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { MdFilterListAlt } from "react-icons/md";
import { useState } from "react"

export default function SortTable() {
  const [createdAtFrom, setCreatedAtFrom] = useState(undefined)
  const [openCreatedAtFrom, setOpenCreatedAtFrom] = useState(false)
  const [createdAtTo, setCreatedAtTo] = useState(undefined)
  const [openCreatedAtTo, setOpenCreatedAtTo] = useState(false)
  return (
    <div className="font-sans flex flex-col lg:flex-row lg:items-center justify-between w-full p-4 gap-x-10 bg-white border border-gray-100 rounded-lg shadow-sm md:overflow-x-auto">
      <form action="#" className="flex items-center justify-between  rounded-md w-full lg:min-w-[400px] lg:max-w-[400px] mb-5 lg:mb-0">
        <input
          type="search"
          placeholder="Search..."
          className="px-2 focus:outline-none focus:border-t focus:border-b focus:border-l h-[40px] rounded-l rounded-l-md w-[calc(100%-50px)] placeholder:text-sm border-t border-b border-l"
        />
        <button className="bg-prim font-xs font-bold text-white h-[40px] px-3 rounded-r rounded-r-md cursor-pointer">Search</button>
      </form>

      <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-x-2 gap-y-3 lg:gap-y-0">
        <Select>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Running">Running</SelectItem>
            <SelectItem value="Canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-full lg:w-[250px] flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-x-3 text-xs lg:h-[40px]">
          <Label htmlFor="start" className="px-1 min-w-[100px]">
            Created from:
          </Label>
          <Popover open={openCreatedAtFrom} onOpenChange={setOpenCreatedAtFrom}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="start"
                className="font-normal text-gray-700 lg:h-full"
              >
                {createdAtFrom ? createdAtFrom.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={createdAtFrom}
                captionLayout="dropdown"
                onSelect={(createdAtFrom) => {
                  setCreatedAtFrom(createdAtFrom)
                  setOpenCreatedAtFrom(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full lg:w-[180px] flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-x-3 text-xs lg:h-[40px]">
          <Label htmlFor="end" className="px-1">
            To:
          </Label>
          <Popover open={openCreatedAtTo} onOpenChange={setOpenCreatedAtTo}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="end"
                className="font-normal text-gray-700 lg:h-full"
              >
                {createdAtTo ? createdAtTo.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={createdAtTo}
                captionLayout="dropdown"
                onSelect={(createdAtTo) => {
                  setCreatedAtTo(createdAtTo)
                  setOpenCreatedAtTo(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <button className="w-full lg:w-auto bg-prim font-bold text-white h-[40px] px-3 rounded cursor-pointer flex items-center justify-center gap-x-1 w-[90px] hover:opacity-70 transition-all duration-300 ease-in-out">
          <MdFilterListAlt />
          <span className="text-sm">Filter</span>
        </button>
      </div>
    </div>
  );
}