export function Spinner({spinnerColor}) {
    return <div className='flex items-center justify-center gap-x-2'>
        <div className={`w-5 h-5 border-3 ${spinnerColor || "border-white"} border-b-transparent rounded-full animate-spin [animation-duration:1.4s]`} />Processing...
    </div>
}