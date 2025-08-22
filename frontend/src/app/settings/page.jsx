import AuthLayout from "../components/AuthLayout";

export default function SettingsPage() {
    return (
        <AuthLayout>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                {/* Add your settings components here */}
            </div>
        </AuthLayout>
    );
}