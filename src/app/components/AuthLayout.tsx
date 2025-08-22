import { MdHomeFilled } from "react-icons/md";
import AppLogo from "./AppLogo";
import AuthNavBar from "./AuthNavBar";
import { IoMdSettings } from "react-icons/io";

export default function AuthLayout() {
    return (
        <div className="flex">
            <div className="h-screen w-[200px] bg-[#1A2E44] text-white p-2">
                <div className="bg-gray-50 text-[#1A2E44] p-2 rounded-sm mb-4 flex items-center justify-center">
                    <AppLogo />
                </div>
                <div className="border-t border-t-gray-600 mt-12 pt-3">
                    <a href="/" className="flex items-center gap-x-2 w-full hover:bg-gray-50 px-2 py-3 hover:rounded-sm hover:text-[#1A2E44] transition-all duration-500 ease-in-out">
                        <MdHomeFilled />
                        <p>Dashboard</p>
                    </a>
                    <a href="/settings" className="flex items-center gap-x-2 w-full hover:bg-gray-50 px-2 py-3 hover:rounded-sm hover:text-[#1A2E44] transition-all duration-500 ease-in-out">
                        <IoMdSettings />
                        <p>Settings</p>
                    </a>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <AuthNavBar />
                <div className="h-[calc(100vh-70px)] p-3 relative top-[80px]">main</div>
            </div>
        </div>
    );
}