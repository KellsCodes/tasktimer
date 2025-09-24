"use client"

import { Spinner } from "@/app/components/spinner"
import api from "@/lib/axios"
import { passwordRegEx } from "@/lib/regEx"
import React, { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation';
import AppLogo from "@/app/components/AppLogo"

const bgImagestyle = {
    backgroundImage: 'url(/logo.svg)',
    backgroundSize: 'fit',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
}


export default function ResetPassword() {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        token: useSearchParams().get("token")
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null) // 1 = success, 2 error

    const handleChangeInput = e => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setMessageType(null)
        setMessage(null)
    }
    const handleRequestToken = async (e) => {
        e.preventDefault()
        if (!formData.password || !formData.confirmPassword) {
            setMessageType(2)
            setMessage("Password fields are required. Please enter your password and confirm the password to continue.")
        } else if (!formData.token) {
            setMessageType(2)
            setMessage("Invalid or missing token. Please confirm from the email that was sent to you.")
        } else if (formData.password !== formData.confirmPassword) {
            setMessageType(2)
            setMessage("Password mismatch.")
        } else if (!passwordRegEx.test(formData.password)) {
            setMessageType(2)
            setMessage('Password should be min of 8 characters with atleast 1 uppercase, 1 lowercase, 1 number and 1 special character.')
        } else {
            setIsSubmitting(true)
            try {
                const res = await api.put("/reset-password", formData)
                setMessageType(1)
                setMessage(res.data?.message)
            } catch (error) {
                console.error(error)
                setMessageType(2)
                if (error?.response?.data?.message) {
                    setMessage(error?.response?.data?.message)
                } else if (error?.response?.status === 500) {
                    setMessage("A server error occurred. Please try again")
                } else {
                    setMessage("The reset token is invalid or expired. You can request a new one and try again.")
                }

            }
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        let interval;
        if (messageType === 1) {
            interval = setInterval(() => {
                window.location.href = "/login"
            }, 3000)
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [messageType])
    return (
        <div style={bgImagestyle} className="font-sans bg-white w-full h-[100vh] flex items-center justify-center">
            <div className="relative bg-white shadow-lg w-full md:w-[500px] h-[370px] rounded-lg p-4 m-5">
                <div className="w-full flex items-center justify-center">
                    <div className="w-22">
                        <AppLogo />
                    </div>
                </div>

                {
                    message ?
                        <div className="bg-white absolute top-4 right-4 left-4 rounded-sm">
                            <div
                                className={`text-center p-4 min-h-[50px] ${messageType === 1 ? "bg-prim" : "bg-red-500"} rounded-sm opacity-70 text-xs flex items-center justify-center`}
                            >
                                {message}
                            </div>
                        </div>
                        : null
                }
                <form onSubmit={handleRequestToken} action="#" className="w-full h-full flex flex-col items-center justify-center gap-y-5">
                    <div className="w-full text-sm">
                        <label htmlFor="email" className="font-bold">New password</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 w-full border p-3 h-12 rounded-md outline-none focus:outline-none focus:border-prim"
                            autoComplete="password"
                            value={formData.password}
                            onChange={handleChangeInput}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="w-full text-sm">
                        <label htmlFor="email" className="font-bold">Confirm password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="mt-1 w-full border p-3 h-12 rounded-md outline-none focus:outline-none focus:border-prim"
                            autoComplete="password"
                            value={formData.confirmPassword}
                            onChange={handleChangeInput}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button className="text-sm mt-5 h-12 bg-prim w-full text-white cursor-pointer font-bold rounded-sm">
                        {isSubmitting ? <Spinner /> : "Change password"}
                    </button>
                </form>
            </div>
        </div>
    )
}

/**
 * {
    "oldPassword": "Newpassword1",
    "password": "Towermore1",
    "confirmPassword": "Towermore1",
    "token": "09e8ab2468d35f447d6152f0297df46ea99d021362ece3f4773de16ec0d115d2"
}

put method: localhost:5001/api/v1/reset-password
 */
