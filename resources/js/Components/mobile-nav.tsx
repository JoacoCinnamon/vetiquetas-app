import { ViewVerticalIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import ApplicationLogo from "./ApplicationLogo"
import { InertiaLinkProps, Link } from "@inertiajs/react"
import { vetiquetasConfig } from "@/Config/Site"
import { User } from "@/types"
import React from "react"

export function MobileNav({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <ViewVerticalIcon className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <ApplicationLogo className="mr-2 h-6 w-6" />
          <span className="font-bold">{vetiquetasConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-2">
            {vetiquetasConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6">
                {item.href
                  ? <MobileLink
                    href={item.href}
                    onOpenChange={setOpen}
                    className={cn(
                      "text-muted-foreground text-sm font-extrabold hover:underline",
                      item.disabled && "cursor-not-allowed opacity-60"
                    )}
                  >
                    {item.title}
                  </MobileLink>
                  : <h4 className="font-medium">{item.title}</h4>
                }
                {item?.items?.length > 0 &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink
                            href={item.disabled ? "#" : item.href}
                            onOpenChange={setOpen}
                            className={cn(
                              "flex w-full items-center rounded-md text-muted-foreground p-2 text-sm font-medium hover:underline",
                              item.disabled && "cursor-not-allowed opacity-60"
                            )}
                          >
                            {item.title}
                          </MobileLink>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends InertiaLinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}