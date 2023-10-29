import { PEDIDOS_ESTADOS, Pedido, PedidoEstado } from "@/types/models";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { useState } from "react";
import { DotsHorizontalIcon, TrashIcon } from "../icons";
import { Spinner } from "../spinner";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { Button, buttonVariants } from "../ui/button";
import Modal from "../ui/modal";
import { Label, LabelError } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

function getEstadosPosibles(pedido: Pedido) {
  if (pedido.estado === PedidoEstado.Pedido) {
    return {
      2: PEDIDOS_ESTADOS[2],
      3: PEDIDOS_ESTADOS[3],
    }
  }

  if (pedido.estado === PedidoEstado.Procesado) {
    return {
      3: PEDIDOS_ESTADOS[3],
    }
  }

  return {}
}

export function PedidoOperaciones({ pedido }: { pedido: Pedido }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  const { data, patch, setData, delete: destroy, errors, processing } = useInertiaForm({ estado: pedido.estado ?? "" });
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
          {(pedido.estado === PedidoEstado.Pedido || pedido.estado === PedidoEstado.Procesado) &&
            <DropdownMenuItem
              onSelect={() => setShowEditModal(true)}
            >
              Editar
            </DropdownMenuItem>
          }
          {pedido.estado === PedidoEstado.Pedido &&
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                onSelect={() => setShowDeleteAlert(true)}
              >
                Cancelar pedido
              </DropdownMenuItem>
            </>
          }
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal open={showEditModal} onOpenChange={setShowEditModal}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Editar el pedido {pedido.id}</Modal.Title>
            <Modal.Description>
              Edita el estado del pedido {pedido.diseño.nombre}.
            </Modal.Description>
          </Modal.Header>
          <form onSubmit={(e) => {
            e.preventDefault()
            patch(route("pedidos.update", { id: pedido.id }),
              {
                onSuccess: () => {
                  setShowEditModal(false);
                },
                only: ["pedidos", "pedido"]
              },
            )
          }}>
            <fieldset disabled={processing} className="group">
              <div className="grid gap-4 py-4">
                <div className="items-center gap-4 space-y-2">
                  <Label>Estado</Label>
                  <Select
                    onValueChange={(value: string) => { setData("estado", parseInt(value)); }}
                    required
                  >
                    <SelectTrigger aria-label="Estado">
                      <SelectValue
                        placeholder="Seleccione el estado"
                        aria-label={pedido?.diseño?.nombre}
                      >
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Estados</SelectLabel>
                        {Object.values(getEstadosPosibles(pedido)).map((estado) => {
                          return <SelectItem key={estado.id} value={estado.id.toString()}>
                            {estado.label}
                          </SelectItem>
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <LabelError message={errors.estado} />
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
              ¿Estás seguro que querés cancelar este pedido?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset disabled={processing} className="group">
            <AlertDialogFooter>
              <AlertDialogCancel>Cerrar</AlertDialogCancel>
              <AlertDialogAction
                onClick={(event) => {
                  event.preventDefault()

                  destroy(route("pedidos.destroy", { id: pedido.id }), {
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
                <span>Cancelar</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
