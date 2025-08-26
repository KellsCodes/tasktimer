import { MdFilterListAlt } from "react-icons/md";

export default function SortTable() {
  return (
    <div className="font-sans flex flex-col lg:flex-row lg:items-center justify-between w-full p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
      <form action="#" className="flex items-center justify-between  rounded-md w-full lg:w-[400px] mb-5 lg:mb-0">
        <input
          type="search"
          placeholder="Search..."
          className="px-2 focus:border-t focus:border-b focus:border-l  focus:outline-0 h-[40px] rounded-l rounded-l-md w-[calc(100%-50px)] placeholder:text-sm border-t border-b border-l"
        />
        <button className="bg-prim font-xs font-bold text-white h-[40px] px-3 rounded-r rounded-r-md cursor-pointer">Search</button>
      </form>
      <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-x-4 gap-y-1 lg:gap-y-0">
        <select name="" id="" className="w-full lg:w-auto h-[40px] border border-gray-300 rounded px-2 cursor-pointer text-sm" defaultValue={'Status'}>
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Running">Running</option>
          <option value="Canceled">Canceled</option>
        </select>
        <div className="w-full lg:w-auto flex items-center gap-x-2 text-xs h-[40px] border px-2 rounded border-gray-300">
          <span>Created from:</span>
          <input type="date" className="focus:ring-0 focus:border-none border-none h-full cursor-pointer" />
        </div>
        <div className="w-full lg:w-auto flex items-center gap-x-2 text-xs h-[40px] border px-2 rounded border-gray-300">
          <span>To:</span>
          <input type="date" className="focus:ring-0 focus:border-none border-none h-full cursor-pointer" />
        </div>
        <button className="w-full lg:w-auto bg-prim font-bold text-white h-[40px] px-3 rounded cursor-pointer flex items-center justify-center gap-x-1 w-[90px] hover:opacity-70 transition-all duration-300 ease-in-out">
          <MdFilterListAlt />
          <span className="text-sm">Filter</span>
        </button>
      </div>
    </div>
  );
}