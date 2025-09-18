

export function EmailVerificationErrorScreen() {
    return (
        <div className="h-[500px] w-full 2xl:w-[500px] bg-white rounded-md bg-white p-4 flex flex-col items-center justify-center gap-y-4">
            <h1 className="font-bold text-[25px] text-center">Invalid token. Login to request a new token.</h1>
            <p className="text-center text-md">Your token is either expired or not found and can't be processed.</p>
        </div>
    )
}