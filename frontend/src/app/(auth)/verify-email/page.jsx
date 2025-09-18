"use client"
import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { EmailVerificationScreen } from './emailVerificationScreen';
import { EmailVerificationSuccess } from './success';
import { EmailVerificationErrorScreen } from './errorScreen';
import { EmailVerificationServerError } from './serverError';
import { useSearchParams } from 'next/navigation';


export default function RegisterUser() {
    const [isLoading, setIsLoading] = useState(true)
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [isVerificationFailed, setIsVerificationFailed] = useState(false)
    const [message, setMessage] = useState(null)

    const token = useSearchParams().get("token")

    const handleEmailVerification = async () => {
        try {
            const { data } = await api.put("/verify-email", {
                token
            })
            if (data.code === 1) {
                setIsEmailVerified(true)
            } else {
                setIsVerificationFailed(true)
            }

        } catch (error) {
            if (error.response.status === 500) {
                setMessage("Email verification failed. Please try again")
            } else {
                setIsVerificationFailed(true)
            }
            console.error(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        handleEmailVerification()
    }, [])
    return (
        <div className="font-sans h-screen w-screen relative flex items-center justify-center px-4">
            {isLoading && <EmailVerificationScreen />}
            {isEmailVerified && <EmailVerificationSuccess />}
            {isVerificationFailed && <EmailVerificationErrorScreen />}
            {message && <EmailVerificationServerError message={message} />}
        </div>
    )
};