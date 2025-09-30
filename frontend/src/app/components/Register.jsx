'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { usernameRegEx, passwordRegEx } from '@/lib/regEx';
import api from '@/lib/axios';
import { Spinner } from './spinner';
import Cookies from 'js-cookie';
import { useUser } from '../authProvider';
import axios from 'axios';
// import { GrLinkedin } from 'react-icons/gr';
// import { SiFacebook } from 'react-icons/si';


const Register = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const pathname = usePathname()

    const { setUser } = useUser()
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handleChange = (e) => {
        setError(null);
        setMessage(null)
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        setMessage(null)
        // Add registration logic here
        if (!form.username || !form.email || !form.password || !form.confirm_password) {
            setError('All fields are required.');
        } else if (!usernameRegEx.test(form.username)) {
            setError('Username should be alphanumeric and min of 3 characters and max of 30 characters')
        } else if (!passwordRegEx.test(form.password)) {
            setError('Password should be min of 8 characters with atleast 1 uppercase, 1 lowercase, 1 number and 1 special character.')
        } else if (form.password !== form.confirm_password) {
            setError('Password mismatch.')
        } else {
            setError(null);
            try {
                const { data } = await api.post("/register", form)
                setMessage("Sign up was successful, please check your email for confirmation, also check spam folder.")
                // redirect user to welcome page (later integration)

            } catch (error) {
                console.error(error)
                if (error.response.status === 400) {
                    setError(error.response.data.message)
                } else {
                    setError("An error occurred, please try again later.")
                }
            }
        }
        setIsSubmitting(false)
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setMessage(null)
        if (!form.email || !form.password) {
            setError('All fields are required.');
        } else {
            try {
                const { data } = await api.post("/login", {
                    email: form.email,
                    password: form.password
                })
                if (data.code === 3) {
                    setError("Email not yet verified. An " + data.message.toLowerCase() + ". Please check your inbox or spam folder.");
                } else {
                    /**
                     * Save user data to local storage and context
                     * save access token and refresh token to browser cookie
                     * redirect user to dashboard
                     */
                    Cookies.set("accessToken", data.accesToken, { expires: 7 })
                    Cookies.set("refreshToken", data.refreshToken, { expires: 7 })
                    localStorage.setItem("user", JSON.stringify(data.user))
                    setUser(data.user)
                    router.push("/dashboard")

                }

            } catch (error) {
                console.error(error)
                if (error.response.status === 500) {
                    setError('A server error occurred. Please try again.');
                } else {
                    setError(error.response.data.message);
                }
            }

        }
        setIsSubmitting(false)

    }

    return (
        <form
            onSubmit={pathname === "/register" ? handleSubmit : handleLogin}
            className='space-y-3'
        >
            <div className='space-y-6 mb-6'>
                <h2 className='font-bold text-4xl'>{pathname === "/register" ? "Sign Up" : "Log In"}</h2>
                <p className='px-5 text-sm text-center'>By creating a Time.It account, you agree to our <a href="#" className='text-[#759FF2]'>Terms of Service</a> and <a href="#" className='text-[#759FF2]'>Privacy Policy</a></p>

            </div>
            <div className='space-y-3'>

                <button
                    type='button'
                    onClick={() => {
                        // setError(null);
                        // setMessage(null)
                        window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`
                    }}
                    className='w-full flex items-center justify-center gap-x-3 h-[50px] border p-3 rounded-[6px] font-medium text-sm hover:bg-[#23374C] hover:text-white transition-all duration-800 ease-in-out cursor-pointer'
                >
                    <FcGoogle className='text-[22px]' />
                    Use Google account
                </button>
                {/* <button
                    className='w-full flex items-center justify-center gap-x-3 h-[50px] border p-3 rounded-[6px] font-medium text-sm hover:bg-[#23374C] hover:text-white transition-all duration-500 ease-in-out cursor-pointer'
                >
                    <SiFacebook className='text-[22px]' />
                    Use Facebook account
                </button> */}
                {/* <button
                    className='w-full flex items-center justify-center gap-x-3 h-[50px] border p-3 rounded-[6px] font-medium text-sm hover:bg-[#23374C] hover:text-white transition-all duration-500 ease-in-out cursor-pointer'
                >
                    <GrLinkedin className='text-[22px]' />
                    Use LinkedIn account
                </button> */}
            </div>
            <div className='relative'>
                <div className='flex items-center justify-center font-bold text-gray-600 my-6'>OR</div>

                {error &&
                    <div className='absolute -top-5 left-0 right-0 bg-white rounded-[3px]'>
                        <div className='min-h-[50px] w-full p-5 flex items-center justify-center bg-red-500 opacity-60 rounded-[3px] text-sm text-white text-center'>{error}</div>
                    </div>
                }
                {message &&
                    <div className='absolute -top-6 left-0 right-0 bg-white rounded-[3px]'>
                        <div className='min-h-[50px] w-full p-5 flex items-center justify-center bg-prim opacity-60 rounded-[3px] text-sm text-center'>{message}</div>
                    </div>
                }
            </div>
            <div>
                {pathname === "/register" && (
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            minLength={3}
                            maxLength={30}
                            onChange={handleChange}
                            autoComplete="username"
                            className='w-full h-[50px] mt-1 border border-gray-300 rounded-[8px] px-3 focus:outline-none focus:ring-1 focus:ring-[#22D172] transition-all duration-500 ease-in-out'
                        />
                    </label>
                )}
            </div>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className='w-full h-[50px] mt-1 border border-gray-300 rounded-[8px] px-3 focus:outline-none focus:ring-1 focus:ring-[#22D172] transition-all duration-500 ease-in-out'
                    />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className='w-full h-[50px] mt-1 border border-gray-300 rounded-[8px] px-3 focus:outline-none focus:ring-1 focus:ring-[#22D172] transition-all duration-500 ease-in-out'
                    />
                </label>
            </div>
            {pathname === "/register" &&
                <div>
                    <label>
                        Confirmation:
                        <input
                            type="password"
                            name="confirm_password"
                            value={form.confirm_password}
                            onChange={handleChange}
                            className='w-full h-[50px] mt-1 border border-gray-300 rounded-[8px] px-3 focus:outline-none focus:ring-1 focus:ring-[#22D172] transition-all duration-500 ease-in-out'
                        />
                    </label>
                </div>
            }
            <button
                type="submit"
                className='cursor-pointer h-[50px] text-white font-bold hover:opacity-70 transition-all duration-300 ease-in-out w-full rounded-[8px] bg-[#22D172]'>
                {pathname === "/register" && !isSubmitting && "Sign Up"}
                {(pathname === "/login" || pathname === "/") && !isSubmitting && "Log in"}
                {isSubmitting && <Spinner />}
            </button>
            {(pathname === "/login" || pathname === "/") ?
                <div className='w-full text-center'>
                    <a href='/forgot-password' className='text-sm text-center text-blue-500'>Forgot password</a>
                </div> : null}
            <div className='text-center text-sm mt-1'>
                <p>Don't have an account yet?</p>
                <a href={pathname === "/register" ? "/login" : "/register"} className='text-[#759FF2]'>{pathname === "/register" ? "Sign In" : "Sign Up"}</a>
            </div>


        </form>
    );
};

export default Register;