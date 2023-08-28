import { PropsWithChildren, ReactNode } from "react";
import { User } from "@/types";
import { MainNavBar } from "./navbar";

export default function Layout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <MainNavBar user={user} />

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
