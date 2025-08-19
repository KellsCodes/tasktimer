'use client';
import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        autoComplete="username"
                    />
                </label>
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
                    />
                </label>
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;