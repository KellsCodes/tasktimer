import Image from "next/image";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <div className="h-[64px] flex flex-col items-center border-b border-b-gray-100 fixed top-0 w-full z-50">
        <Navbar />
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="relative top-[80px] w-full flex flex-col items-center py-10 px-20">
          <div className=" w-[60%] mxto-auto flex items-center gap-x-30">
            <div className="w-1/2">
              <Register />
            </div>
            <div className="w-1/2">
              <Image src="/logo.svg" width={400} height={400} alt="Logo" />
              <h2 className="font-bold text-gray-900 text-xs">Time.It- schedule task, get notified, manage task, never miss any deadlines.</h2>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
