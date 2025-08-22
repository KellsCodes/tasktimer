import Navbar from "@/app/components/Navbar";
import Register from "@/app/components/Register";
import Image from "next/image";

export default function UserLogin() {
  return (
    <div className="font-sans min-h-screen">
      <Navbar />
      <main className="px-5 xl:px-0 flex flex-col xl:gap-[32px] row-start-2 items-center sm:items-start">

        <div className="relative top-[80px] w-full flex flex-col items-center py-10 lg:px-10 xl:px-20">
          <div className="w-full xl:w-[60%] mx-auto flex flex-col lg:flex-row items-center lg:gap-x-30 gap-y-8 lg:gap-y-0">
            <div className="lg:w-1/2">
              <Register />
            </div>
            <div className="lg:w-1/2">
              <Image src="/logo.svg" width={400} height={400} alt="Logo" className="hidden lg:inline-block" />
              <h2 className="font-bold text-gray-900 text-xs text-center xl:text-justify">Time.It- schedule task, get notified, manage task, never miss deadlines.</h2>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
