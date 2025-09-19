import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Spinner } from "../components/spinner";
import api from "@/lib/axios";
import { passwordRegEx } from "@/lib/regEx";

export default function SecurityPage() {
    const [data, setData] = useState({})
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
        setError(false)
        setMessage(null)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!data?.oldPassword || !data?.password || !data.confirmPassword) {
            setError(true)
            setMessage("All password fields are required.")
        } else if (!passwordRegEx.test(data.password)) {
            setMessage('Password should be min of 8 characters with atleast 1 uppercase, 1 lowercase, 1 number and 1 special character.')
            setError(true)
        } else if (data.password !== data.confirmPassword) {
            setMessage('Password mismatch.')
            setError(true)
        } else {
            setIsSubmitting(true)
            try {
                const res = await api.put("/update-password", data)
                if (res.data.code === 1) {
                    setMessage(res.data.message)
                    setError(false)
                } else {
                    setError(true)
                    setMessage("An error occurred. Please try again.")
                }
            } catch (error) {
                console.error(error)
                setMessage(error?.response?.data?.message || "An error occurred. Please try again.")
                setError(true)
            }

        }
        setIsSubmitting(false)
    }
    return (
        <div className="flex flex-1 flex-col gap-4">
            {message &&
                <div
                    className={`h-15 w-full p-4 rounded-md bg-${error ? "red-500" : "prim"} opacity-70 text-sm flex items-center justify-center`}
                >
                    {message}
                </div>
            }
            <form onSubmit={handleSubmit} action="#" className="space-y-5">
                <div>
                    <label htmlFor="oldPassword" >Old Password</label>
                    <Input
                        type={'password'}
                        value={data?.oldPassword || ""}
                        placeholder="Old Password"
                        className={`h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                        name="oldPassword"
                        id="oldPassword"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="password" >Password</label>
                    <Input
                        type={'password'}
                        value={data?.password || ""}
                        placeholder="Password"
                        className={`h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                        name="password"
                        id="password"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirm_password">Confirm password</label>
                    <Input
                        type={'password'}
                        value={data?.confirmPassword || ""}
                        placeholder="Confirm password"
                        className={`h-[50px] px-3 focus:outline-none focus:ring-1 focus:ring-prim transition-all duration-500 ease-in-out placeholder:text-muted-foreground placeholder:text-sm`}
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={handleChange}
                    />
                </div>

                <Button
                    type="submit"
                    className={`bg-prim h-[50px] hover:bg-prim hover:opacity-70 transition-all duration-300 ease-in-out cursor-pointer w-full`}
                >
                    {isSubmitting ? <Spinner /> : "Change Password"}
                </Button>
            </form>
        </div>
    );
}