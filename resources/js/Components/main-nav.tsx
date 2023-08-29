import { Link } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";
import { vetiquetasConfig } from "@/Config/Site";
import { cn } from "@/lib/utils";
import NavLink from "./NavLink";

import { User } from "@/types";
import { UserDropdown } from "./user-dropdown";


export function MainNav({ user }: { user: User | null }) {
  return (
    <>
      <div className="mr-4 hidden md:flex">
        <Link href="/" className="mr-6 flex items-center">
          <ApplicationLogo className="h-8 w-8" />
          <span className="hidden font-bold sm:inline-block">{/* {vetiquetasConfig.name} */}</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {vetiquetasConfig.mainNav.map((item, index) => {
            return item.href && (
              <NavLink href={item.href} key={index} active={false} >
                {item.title}
              </NavLink>
            )
          })}
        </nav>
      </div>
      <div className="hidden md:flex">
        <UserDropdown user={user} />
      </div>
    </>
  )
}