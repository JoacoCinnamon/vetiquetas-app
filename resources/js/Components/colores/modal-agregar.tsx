import { FormEventHandler, useState } from "react";
import { PlusIcon } from "../icons";
import { Spinner } from "../spinner";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import Modal from "../ui/modal";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { LabelError } from "../ui/label";

export function ModalAgregarColor() {
  const [open, setOpen] = useState(false);
  const { errors, post, processing, setData, reset } = useInertiaForm({ nombre: "", hex: "" });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("administracion.colores.store"),
      {
        onSuccess: () => {
          setOpen(false);
          reset();
        }
      }
    );
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button asChild>
        <Button className="inline-flex items-center justify-center"><PlusIcon className="absolute h-4" /></Button>
      </Modal.Button>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Agregar un color</Modal.Title>
          <Modal.Description>
            Crear un nuevo color.
          </Modal.Description>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <fieldset disabled={processing} className="group">
            <div className="grid gap-4 py-4">
              <div className="items-center gap-4 space-y-2">
                <Input placeholder="Rojo" onChange={(e) => {
                  setData("nombre", e.target.value);
                }} />
                <LabelError message={errors.nombre} />
              </div>
              <div className="items-center gap-4 space-y-2">
                <Input type="color" placeholder="Rojo" defaultValue="#EA4A4A" onChange={(e) => {
                  setData("hex", e.target.value);
                }} />
                <LabelError message={errors.hex} />
              </div>
            </div>
            <Modal.Footer className="gap-2 sm:gap-0">
              <Modal.Close asChild>
                <Button className={buttonVariants({ variant: "secondary" })}>
                  Cerrar
                </Button>
              </Modal.Close>
              <Button className="inline-flex items-center justify-center px-4 py-2 font-medium  group-disabled:pointer-events-none">
                <Spinner className="absolute h-5 group-enabled:opacity-0" />
                <span className="group-disabled:opacity-0">Agregar</span>
              </Button>
            </Modal.Footer>
          </fieldset>
        </form>
      </Modal.Content>
    </Modal>
  )
}