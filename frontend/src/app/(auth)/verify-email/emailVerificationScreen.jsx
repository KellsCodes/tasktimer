import { Spinner } from '@/app/components/spinner';

export function EmailVerificationScreen() {
    return (
        <div className="h-[500px] w-full 2xl:w-[500px] bg-white rounded-md bg-white p-4 flex flex-col items-center justify-center gap-y-4">
            <h1 className="font-bold text-[22px] text-center">Your email verification is in progress, please wait.</h1>
            <Spinner spinnerColor={"border-prim"} />
        </div>
    )
}