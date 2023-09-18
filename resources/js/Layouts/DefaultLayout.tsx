import { PropsWithChildren, ReactNode } from "react";
import { User } from "@/types";
import SiteFooter from "@/Components/site-footer";
import { MobileNav } from "@/Components/mobile-nav";
import { MainNav } from "@/Components/main-nav";
import { Link } from "@inertiajs/react";


export default function Layout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User | null; header?: ReactNode }>) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8 h-20">
                    <MainNav user={user} />
                    <MobileNav user={user} />
                </nav>
            </header>
            {header &&
                <div className="shadow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            }
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div >
    );
}
