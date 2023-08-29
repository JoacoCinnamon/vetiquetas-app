import { PropsWithChildren, ReactNode } from "react";
import { User } from "@/types";
import { MainNavBar } from "./navbar";
import SiteFooter from "@/Components/site-footer";
import { MobileNav } from "@/Components/mobile-nav";
import { MainNav } from "@/Components/main-nav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { vetiquetasConfig } from "@/Config/Site";

export default function Layout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User | null; header?: ReactNode }>) {
    return (
        < div className="flex min-h-screen flex-col" >
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav user={user} />
                    <MobileNav user={user} />
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div >
    );
}
