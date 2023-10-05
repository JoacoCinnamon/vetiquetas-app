import { TipoEtiqueta } from "@/types/models";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { useState } from "react";
import { DotsHorizontalIcon, TrashIcon } from "../icons";
import { Spinner } from "../spinner";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { Button, buttonVariants } from "../ui/button";
import Modal from "../ui/modal";
import { Input } from "../ui/input";

export function TipoEtiquetaOperaciones({ tipoEtiqueta }: { tipoEtiqueta: TipoEtiqueta }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  const { data, patch, setData, delete: destroy, errors, processing } =
    useInertiaForm({ nombre: tipoEtiqueta.nombre ?? "" });

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
            onSelect={() => setShowEditModal(true)}
          >
            Editar
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
      <Modal open={showEditModal} onOpenChange={setShowEditModal}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Editar tipo de etiqueta</Modal.Title>
            <Modal.Description>
              Edita el tipo de etiqueta seleccionado ({tipoEtiqueta.nombre}).
            </Modal.Description>
          </Modal.Header>
          <form onSubmit={(e) => {
            e.preventDefault()
            patch(route("administracion.etiquetas.update", { id: tipoEtiqueta.id }),
              {
                onSuccess: () => {
                  setShowEditModal(false);
                },
                only: ["tipo_etiquetas", "tipoEtiqueta"]
              },
            )
          }}>
            <fieldset disabled={processing} className="group">
              <div className="grid gap-4 py-4">
                <div className="items-center gap-4 space-y-2">
                  <Input value={data.nombre} placeholder="Tafeta" onChange={(e) => {
                    setData("nombre", e.target.value);
                  }} />
                  {errors.nombre && <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.nombre}
                  </p>
                  }
                </div>
              </div>
              <Modal.Footer className="gap-2 sm:gap-0">
                <Modal.Close asChild>
                  <Button variant="secondary">
                    Cerrar
                  </Button>
                </Modal.Close>
                <Button className="inline-flex items-center justify-center px-4 py-2 font-medium  group-disabled:pointer-events-none">
                  <Spinner className="absolute h-5 group-enabled:opacity-0" />
                  <span className="group-disabled:opacity-0">Editar</span>
                </Button>
              </Modal.Footer>
            </fieldset>
          </form>
        </Modal.Content>
      </Modal>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro que querés borrar este tipo de etiqueta?
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

                  destroy(route("administracion.etiquetas.destroy", { id: tipoEtiqueta.id }), {
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
