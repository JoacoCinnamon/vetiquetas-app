import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { User } from "@/types"
import { Link } from "@inertiajs/react"
import NavLink from "./NavLink"
import { Button } from "./ui/button"


interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User | null
}

export function UserDropdown({ user }: UserAccountNavProps) {
  if (!user) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex justify-center items-center">
        <Button variant="outline">
          {user.nombre} {user.apellido} <svg
            className="ml-2 -mr-0.5 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.nombre && <p className="font-medium">{user.nombre} {user.apellido}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={route("perfil.edit")}>Perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
        >
          <Link href={route("cerrar-sesion")}
            method="post"
            as="button">
            Cerrar Sesión
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}