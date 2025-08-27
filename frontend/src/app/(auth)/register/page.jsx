import Navbar from "@/app/components/Navbar";
import Register from "@/app/components/Register";
import Image from "next/image";

export default function RegisterUser() {
    return (
        <div className="font-sans min-h-screen relative">
            <Navbar />
            <main className="px-5 xl:px-0 flex flex-col xl:gap-[32px] row-start-2 items-center sm:items-start">

                <div className="relative top-[80px] w-full flex flex-col items-center py-10 lg:px-10 xl:px-20">
                    <div className="w-full xl:w-[60%] mx-auto flex flex-col lg:flex-row items-center lg:gap-x-30 gap-y-8 lg:gap-y-0">
                        <div className="lg:w-1/2">
                            <Register />
                        </div>
                        <div className="lg:w-1/2">
                            <Image src="/tired-man-missing-deadline-office.webp" width={800} height={800} loading="lazy" alt="deadline-image" className="hidden lg:inline-block" />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
};