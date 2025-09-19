"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Spinner } from "../components/spinner";

export default function ProfilePage() {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmiting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)

    const handleFetchData = async () => {
        try {
            const { data } = await api.get("/profile")
            if (data.code === 1) {
                setData(data.profile)
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
        setError(false)
        setMessage(null)
    }

    const handleSubmitData = async (e) => {
        e.preventDefault()
        if (isLoading) return
        setIsSubmitting(true)
        try {
            const res = await api.put("/profile", data)
            if (res.data.code === 1) {
                setMessage(res.data.message)
            } else {
                setMessage(res.data.message || "An error occurred. Try again.")
            }
            console.log(res)
            setError(false)
        } catch (error) {
            console.log(error)
            setError(true)
            setMessage(error.response.data.message || "An error occurred. Try again.")
        }
        setIsSubmitting(false)
    }
    useEffect(() => {
        handleFetchData()
    }, [])
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[200px] w-full">
                <Spinner spinnerColor={"border-prim"} />
            </div>
        )
    } else {

        return (
            <div className="flex flex-1 flex-col gap-4">
                <form onSubmit={handleSubmitData} action="#" className="space-y-5">
                    <div className="h-[80px] w-[80px] rounded-full shadow p-[4px] bg-white relative cursor-pointer">
                        <img src={`/logo.svg`} alt="profile-img" loading="lazy" className="w-full h-full rounded-full" />
                        <button className="cursor-pointer w-[25px] h-[25px] bg-white shadow rounded-full flex items-center justify-center absolute bottom-0 right-0">
                            <MdEdit className="text-[16px]" />
                        </button>
                    </div>
                    {message &&
                        <div
                            className={`h-12 w-full rounded-md ${error ? "bg-red-400" : "bg-prim"} opacity-80 p-2 flex items-center justify-center text-sm`}
                        >
                            {message}
                        </div>
                    }
                    <div>
                        <label htmlFor="username">Username</label>
                        <Input readOnly
                            value={""}
                            placeholder={`kellscodes`}
                            className={`cursor-not-allowed h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                            name="username"
                            id="username"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input readOnly
                            value={""}
                            placeholder={`kellyn@gmail.com`}
                            className={`cursor-not-allowed h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                            name="email"
                            id="email"
                            type={'email'}
                        />
                    </div>
                    <div>
                        <label htmlFor="firstname" >Firstname</label>
                        <Input
                            value={data?.firstname}
                            placeholder={`Firstname`}
                            className={`h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                            name="firstname"
                            id="firstname"
                            onChange={handleChange}
                            minLength={3}
                            maxLength={30}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastname">Lastname</label>
                        <Input
                            value={data?.lastname}
                            placeholder={"Lastname"}
                            className={`h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                            name="lastname"
                            id="lastname"
                            onChange={handleChange}
                            minLength={3}
                            maxLength={30}
                        />
                    </div>
                    <div>
                        <label htmlFor="profession">Profession</label>
                        <Input
                            value={data?.profession}
                            placeholder={`Profession e.g Analyst`}
                            className={`h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out`}
                            name="profession"
                            id="profession"
                            onChange={handleChange}
                            minLength={3}
                            maxLength={30}
                        />
                    </div>
                    <Button
                        type="submit"
                        className={`bg-prim h-[50px] hover:bg-prim hover:opacity-70 transition-all duration-300 ease-in-out cursor-pointer w-full`}
                    >
                        {isSubmiting ? <Spinner /> : "Save Changes"}

                    </Button>
                </form>
                {/* Add your profile settings components here */}
            </div>
        );
    }
}