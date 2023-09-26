import { cn } from "@/lib/utils";
import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={cn("inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none", active
                ? "border-[#EA4A4A] text-foreground focus:border-red-600"
                : "border-transparent text-foreground/60 hover:text-foreground/80 hover:border-accent focus:border-accent focus:text-foreground/80", className
            )
            }
        >
            {children}
        </Link>
    );
}
