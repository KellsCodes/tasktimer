"use client"

import { Spinner } from "@/app/components/spinner"
import api from "@/lib/axios"
import React, { useState } from "react"

const bgImagestyle = {
    backgroundImage: 'url(/logo.svg)',
    backgroundSize: 'fit',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
}


export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null) // 1 = success, 2 error

    const handleRequestToken = async (e) => {
        e.preventDefault()
        if (!email) {
            setMessageType(2)
            setMessage("Email field is required. Please enter your email to continue.")
        } else {
            setIsSubmitting(true)
            try {
                const res = await api.post("/forgot-password", { email })
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
                    setMessage("We can't find your email at the moment. Please try again later.")
                }

            }
            setIsSubmitting(false)
        }
    }
    return (
        <div style={bgImagestyle} className="font-sans bg-white w-full h-[100vh] flex items-center justify-center">
            <div className="relative bg-white shadow-lg w-full md:w-[500px] h-[400px] rounded-lg p-4 m-5">
                {
                    message ?
                        <div
                            className={`absolute top-4 right-4 left-4 p-4 min-h-[70px] ${messageType === 1 ? "bg-prim" : "bg-red-500"} rounded-sm opacity-70 text-xs flex items-center justify-center`}
                        >
                            {message}
                        </div>
                        : null
                }
                <form onSubmit={handleRequestToken} action="#" className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-full text-sm">
                        <label htmlFor="email" className="font-bold">Email</label>
                        <input
                            type="email"
                            className="mt-1 w-full border p-3 h-12 rounded-md outline-none focus:outline-none focus:border-prim"
                            autoComplete="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                                setMessageType(null)
                                setMessage(null)
                            }
                            }
                            placeholder="Enter your email"
                        />

                        <button className="mt-5 h-12 bg-prim w-full text-white cursor-pointer font-bold rounded-sm">
                            {isSubmitting ? <Spinner /> : "Send me a token"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

/**
 * 

{
    "email": "nworjiifeanyi@gmail.com"
}

post method: localhost:5001/api/v1/forgot-password
 */