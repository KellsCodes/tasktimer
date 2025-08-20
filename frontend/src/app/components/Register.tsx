'use client';
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { GrLinkedin } from 'react-icons/gr';
import { SiFacebook } from 'react-icons/si';

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const [form, setForm] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add registration logic here
        if (!form.username || !form.email || !form.password) {
            setError('All fields are required.');
            return;
        }
        setError(null);
        // Submit form data
        console.log('Registering:', form);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-3'>
            <h2 className='font-bold text-4xl'>Log In</h2>
            <p className='px-5 text-sm text-center'>By creating a TaskIt account, you agree to our <a href="#" className='text-[#759FF2]'>Terms of Service</a> and <a href="#" className='text-[#759FF2]'>Privacy Policy</a></p>
            <div className='space-y-3'>
                <button
                    className='w-full flex items-center justify-center gap-x-3 h-[50px] border p-3 rounded-[6px] font-medium text-sm hover:bg-[#23374C] hover:text-white transition-all duration-500 ease-in-out cursor-pointer'
                >
                    <FcGoogle className='text-[22px]' />
                    Use Google account
                </button>
                <button
                    className='w-full flex items-center justify-center gap-x-3 h-[50px] border p-3 rounded-[6px] font-medium text-sm hover:bg-[#23374C] hover:text-white transition-all duration-500 ease-in-out cursor-pointer'
                >
                    <SiFacebook className='text-[22px]' />
                    Use Facebook account
                </button>
                <button
                    className='w-full flex items-center justify-center gap-x-3 h-[50px] border p-3 rounded-[6px] font-medium text-sm hover:bg-[#23374C] hover:text-white transition-all duration-500 ease-in-out cursor-pointer'
                >
                    <GrLinkedin className='text-[22px]' />
                    Use LinkedIn account
                </button>
            </div>
            <div className='flex items-center justify-center font-bold text-gray-600 my-6'>OR</div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                {/* <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        autoComplete="username"
                    />
                </label> */}
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
                        autoComplete="new-password"
                        className='w-full h-[50px] mt-1 border border-gray-300 rounded-[8px] px-3 focus:outline-none focus:ring-1 focus:ring-[#22D172] transition-all duration-500 ease-in-out'
                    />
                </label>
            </div>
            <button type="submit" className='cursor-pointer h-[50px] text-white font-bold hover:opacity-70 transition-all duration-300 ease-in-out w-full rounded-[8px] bg-[#22D172]'>Log In</button>
            <div className='text-center text-sm mt-1'>
                <p>Don't have an account yet?</p>
                <a href="#" className='text-[#759FF2]'>Sign Up</a>
            </div>
        </form>
    );
};

export default Register;