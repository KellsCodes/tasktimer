'use client';
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    // BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation';
import { Modal } from "./Modal";
import { useState } from "react";
import Tasks from "./tasks";

export default function AuthLayout({ children, setData }) {
    const pathname = usePathname()
    const [open, setOpenChange] = useState(false);
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <div className="w-full pr-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 px-3">
                            <SidebarTrigger />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href={pathname}>
                                            {pathname.replace('/', '').charAt(0).toUpperCase() + pathname.slice(2)}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    {/* <BreadcrumbItem>
                                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                    </BreadcrumbItem> */}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <Button
                            className={'bg-prim hover:bg-prim hover:opacity-60 transition-all duration-500 ease-in-out cursor-pointer font-bold font-sans text-md'}
                            onClick={() => { setOpenChange(true) }}
                        >
                            Add Task
                        </Button>
                    </div>
                </header>
                {children}
                {open &&
                    <Modal props={{ open: open, onOpenChange: () => { setOpenChange(prev => !prev) } }}>
                        <Tasks type="create" data={null} setData={setData} />
                    </Modal>
                }
            </SidebarInset>
        </SidebarProvider>
    );
}
