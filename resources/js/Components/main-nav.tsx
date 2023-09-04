import { Link } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";
import { vetiquetasConfig } from "@/Config/Site";
import { cn } from "@/lib/utils";
import NavLink from "./nav-link";

import { User } from "@/types";
import { UserDropdown } from "./user-dropdown";


export function MainNav({ user }: { user: User | null }) {
  return (
    <>
      <div className="hidden md:flex md:flex-1">
        <Link href="/" className="mr-6 flex items-center">
          <ApplicationLogo className="h-8 w-8" />
          <span className="hidden font-bold sm:inline-block">{/* {vetiquetasConfig.name} */}</span>
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium">
          {vetiquetasConfig.mainNav.map((item, index) => {
            if (!user?.isAdmin && item.isPrivate) return null
            if (!user && item.isProtected) return null
            return item.href && (
              <NavLink href={item.href} key={index} active={item.isActive()}>
                {item.title}
              </NavLink>
            )
          })}
        </div>
      </div>
      <div className="hidden md:flex md:gap-x-12">
      </div>
      <div className="hidden flex-1 items-center justify-end gap-x-6 md:flex">
        <div className="flex items-center gap-4">
          <UserDropdown user={user} />
        </div>
      </div>
    </>
  )
}