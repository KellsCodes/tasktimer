import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage";
import { Spinner } from "@/app/components/spinner";

export default function Page() {
    return (
        <Suspense fallback={<div className="w-full h-[90vh] flex items-center justify-center"><Spinner /></div>}>
            <ResetPasswordPage />
        </Suspense>
    );
}
