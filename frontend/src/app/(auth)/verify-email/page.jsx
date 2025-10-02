import { Suspense } from "react";
import { Spinner } from "@/app/components/spinner";
import UserEmailVerification from "./UserEmailVerification";

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="w-full h-[90vh] flex items-center justify-center">
                    <Spinner spinnerColor={"border-prim"} />
                </div>
            }
        >
            <UserEmailVerification />
        </Suspense>
    );
}
