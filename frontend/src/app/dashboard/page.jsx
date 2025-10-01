import { Suspense } from "react";
import { Spinner } from "@/app/components/spinner";
import DashboardPage from "./dashboard-page";

export default function Page() {
    return (
        <Suspense fallback={<div className="w-full h-90vh flex items-center justify-center"><Spinner /></div>}>
            <DashboardPage />
        </Suspense>
    );
}
