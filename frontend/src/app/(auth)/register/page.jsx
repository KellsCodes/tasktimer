import Navbar from "@/app/components/Navbar";
import Register from "@/app/components/Register";
import Image from "next/image";

export default function RegisterUser() {
    return (
        <div className="font-sans min-h-screen relative">
            <Navbar />
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

                <div className="relative top-[80px] w-full flex flex-col items-center py-10 px-20">
                    <div className=" w-[60%] mxto-auto flex items-center gap-x-30">
                        <div className="w-1/2">
                            <Register />
                        </div>
                        <div className="w-1/2">
                            <Image src="/tired-man-missing-deadline-office.webp" width={800} height={800} loading="lazy" alt="deadline-image" />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
};