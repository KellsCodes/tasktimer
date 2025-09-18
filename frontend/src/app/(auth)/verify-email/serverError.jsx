

export function EmailVerificationServerError({ message }) {
    return (
        <div className="h-[500px] w-full 2xl:w-[500px] bg-white rounded-md bg-white p-4 flex flex-col items-center justify-center gap-y-4">
            <h1 className="font-bold text-[25px] text-center">{message}</h1>
        </div>
    )
}