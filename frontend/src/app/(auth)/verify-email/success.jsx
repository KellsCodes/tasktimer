import { IoMdCheckmarkCircle } from "react-icons/io";

export function EmailVerificationSuccess() {
    return (
        <div className="h-[700px] w-full 2xl:w-[500px] bg-white rounded-md border border-2 border-gray-100 shadow-lg bg-white p-4 flex flex-col items-center justify-center gap-y-4">
            <IoMdCheckmarkCircle className="text-[60px] text-prim" />
            <h1 className="font-bold text-[28px]">Email Verification</h1>
            <p className="text-center text-md">Your email was verified, you can now continue using the application.</p>
            <a href="/login" className="h-12 w-full md:w-[300px] rounded-md bg-prim text-md font-bold text-white p-2 flex items-center justify-center">Log in</a>
        </div>
    )
}