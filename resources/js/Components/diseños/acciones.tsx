import { Diseño } from "@/types/models";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { useState } from "react";
import { DotsHorizontalIcon, TrashIcon } from "../icons";
import { Spinner } from "../spinner";
import { Link, useForm as useInertiaForm } from "@inertiajs/react";
import { Button, buttonVariants } from "../ui/button";

export function DiseñosOperaciones({ diseño }: { diseño: Diseño }) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  const { delete: destroy, processing } =
    useInertiaForm({ nombre: diseño.nombre ?? "" });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            asChild
          >
            <Link href={route("disenios.edit", diseño.id)}>
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Borrar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro que querés borrar este diseño?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset disabled={processing} className="group">
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={(event) => {
                  event.preventDefault()

                  destroy(route("disenios.destroy", { id: diseño.id }), {
                    preserveScroll: true,
                    onFinish: () => setShowDeleteAlert(false),
                  })
                }}
                className={buttonVariants({ variant: "destructive" })}
              >
                {processing ? (
                  <Spinner className="mr-2 h-4 w-4" />
                ) : (
                  <TrashIcon className="mr-2 h-4 w-4" />
                )}
                <span>Borrar</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
