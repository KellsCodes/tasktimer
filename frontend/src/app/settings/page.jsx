"use client"

import AuthLayout from "../components/AuthLayout";
import ProfilePage from "./profile";
import SecurityPage from "./security";
import { useState } from "react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState(0); // 0 for Profile, 1 for Security
    return (
        <AuthLayout>
            <div className="flex items-centerr justify-center mt-5 lg:mt-20 ">
                {/* <h1 className="text-2xl font-bold">Settings</h1> */}
                <div className="flex flex-col gap-y-5 w-[500px] p-8 rounded-sm shadow-sm">
                    <div className="flex items-center gap-x-4">
                        <div
                            onClick={() => { setActiveTab(0) }}
                            className={`cursor-pointer font-medium border-b border-b-2 pr-2 ${activeTab === 0 ? "border-b-prim text-prim" : "border-b-white"} transition-all duration-300 ease-in-out`}>Profile</div>
                        <div
                            onClick={() => { setActiveTab(1) }}
                            className={`cursor-pointer font-medium border-b border-b-2 pr-2 ${activeTab === 1 ? "border-b-prim text-prim" : "border-b-white"} transition-all duration-300 ease-in-out`}>Security</div>
                    </div>
                    {activeTab === 0 ?
                        <ProfilePage /> :
                        <SecurityPage />
                    }

                </div>
            </div>
        </AuthLayout>
    );
}