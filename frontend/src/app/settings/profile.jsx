"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Spinner } from "../components/spinner";
import { useUser } from "../authProvider";

export default function ProfilePage() {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmiting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)
    const { user, setUser } = useUser()

    const handleFetchData = async () => {
        try {
            const res = await api.get("/profile")
            if (res.data.code === 1) {
                const userData = res.data.profile.user;
                delete res.data.profile.user
                setData({ ...res.data.profile, ...userData })
            }
        } catch (error) {
            console.error(error)
            // If no profile data found, call up user data from localstorage
            if (error?.response?.data?.code === 2) {
                const userData = localStorage.getItem("user")
                setData(userData ? JSON.parse(userData) : {})
            }
        }
        setIsLoading(false)
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === "profileImage") {
            setData({ ...data, [name]: event.target.files[0] })
        } else {
            setData({ ...data, [name]: value })
        }
        setError(false)
        setMessage(null)
    }

    const handleSubmitData = async (e) => {
        e.preventDefault()
        if (isLoading) return
        setIsSubmitting(true)
        try {
            const formData = new FormData();
            const values = ["firstname", "lastname", "profession", "profileImage"]
            values.forEach(name => data[name] && formData.append(name, data[name]))
            const res = await api.put("/profile", formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            if (res.data.code === 1) {
                setMessage(res?.data?.message)
                setUser({ ...user, profileImage: res?.data?.data?.profileImage })
                if (data?.profileImage?.type?.startsWith("image/")) {
                    localStorage.setItem("user", JSON.stringify({ ...user, profileImage: res?.data?.data?.profileImage }))
                }
            } else {
                setMessage(res?.response?.data?.message || "An error occurred. Try again.")
            }
            setError(false)
        } catch (error) {
            console.error(error)
            setError(true)
            setMessage(error?.response?.data?.message || "An error occurred. Try again.")
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
                        {!data?.profileImage ? <div className="w-full h-full rounded-full flex items-center justify-center text-md font-bold font-san">{data?.username?.slice(0, 2)?.toUpperCase()}</div> :
                            <img
                                src={
                                    data?.profileImage?.type?.startsWith("image/") ?
                                        URL.createObjectURL(data?.profileImage) :
                                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${data?.profileImage}`
                                }
                                alt="profile-img"
                                loading="lazy"
                                className="w-full h-full contain rounded-full"
                            />
                        }
                        <button
                            type="button"
                            className="cursor-pointer w-[25px] h-[25px] bg-white shadow rounded-full flex items-center justify-center absolute bottom-0 right-0"
                            onClick={() => {
                                const dom = document.getElementById("profileImage")
                                dom.click()
                            }}
                        >
                            <MdEdit className="text-[16px]" />
                        </button>
                        <Input
                            name="profileImage"
                            id="profileImage"
                            onChange={handleChange}
                            type="file"
                            accept=".jpeg, .jpg, .png, .webp, image/jpeg, image/png, image/webp"
                            hidden
                        />
                    </div>
                    {message &&
                        <div
                            className={`min-h-12 w-full rounded-md ${error ? "bg-red-400" : "bg-prim"} opacity-80 p-5 flex items-center justify-center text-sm`}
                        >
                            {message}
                        </div>
                    }
                    <div>
                        <label htmlFor="username">Username</label>
                        <Input readOnly
                            value={data?.username}
                            placeholder={`username`}
                            className={`cursor-not-allowed h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                            name="username"
                            id="username"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input readOnly
                            value={data?.email}
                            placeholder={`youremail`}
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