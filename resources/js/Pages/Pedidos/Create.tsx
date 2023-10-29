import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { useForm as useInertiaForm } from '@inertiajs/react';
import { PageProps } from "@/types";
import { Header } from "@/Components/header";

import { Diseño, Precio, TipoEntrega } from "@/types/models";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Label, LabelError } from "@/Components/ui/label";
import { FormEventHandler } from "react";
import { Spinner } from "@/Components/spinner";
import { Textarea } from "@/Components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/Components/ui/calendar";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { tipoEntregaForm } from "@/lib/validations/cotizacion";
import { Input } from "@/Components/ui/input";

export default function PedidosCreate({
  auth,
  precios,
  diseños
}: PageProps<{ precios: Precio[], diseños: Diseño[] }>) {
  const { errors, post, processing, setData, data, reset } =
    useInertiaForm<{
      descripcion: string;
      disenio_id: string;
      fecha_prevista: Date | undefined;
      tipo_entrega: string;
      cantidad: number;
    }>({
      descripcion: "",
      disenio_id: "",
      fecha_prevista: undefined,
      tipo_entrega: TipoEntrega.Rollo,
      cantidad: 1500,
    });

  if (diseños?.length === 0 || !diseños) {
    return <AuthenticatedLayout user={auth.user}>
      <section className="h-auto preview flex min-h-[350px] w-full justify-center p-10 items-center">
        Aún faltan precios por cargar para los tipos de etiquetas...
      </section>
    </AuthenticatedLayout>
  }

  const selectedDiseño = diseños.find(d => d.id.toString() === data.disenio_id);
  const precio = precios.find(p => (p.medida === selectedDiseño?.ancho && p.cantidad_colores === selectedDiseño?.colores.length));

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!precio || !selectedDiseño) return;

    // HACER CALCULOS DE LA COTIZADORA Y MOSTRARLO

    post(route("pedidos.store"))
  }

  return (
    <>
      <AuthenticatedLayout
        user={auth.user}
        header={<Header heading="Pedidos" text="Haga un pedido." />}
      >
        <Head title="Pedidos" />
        <section className="h-auto preview flex min-h-[350px] w-full justify-center p-6 items-center">
          <form onSubmit={onSubmit} className="w-full lg:w-2/5">
            <fieldset disabled={processing} className="group">
              <Card>
                <CardHeader>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción del pedido</Label>
                    <Textarea value={data.descripcion}
                      id="descripcion"
                      name="descripcion"
                      autoComplete="descripcion"
                      placeholder="Talles: S-500, M-500..."
                      onChange={(e) => setData("descripcion", e.target.value)}
                      required
                    />
                    <LabelError message={errors.descripcion} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>Diseño</Label>
                      <Select
                        onValueChange={(value: string) => setData("disenio_id", value)}
                        required
                      >
                        <SelectTrigger aria-label="Diseños">
                          <SelectValue
                            placeholder="Seleccione el diseño"
                            aria-label={selectedDiseño?.nombre}
                          >
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Diseño</SelectLabel>
                            {diseños?.map((diseño) => {
                              return <SelectItem key={diseño.id} value={diseño.id.toString()}>
                                {diseño.nombre}
                              </SelectItem>
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <LabelError message={errors.disenio_id} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fecha_prevista">
                        Fecha de entrega
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !data.fecha_prevista && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {data.fecha_prevista ? format(data.fecha_prevista, "PPP", { locale: es }) : <span>Seleccione una fecha</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            required
                            mode="single"
                            fromDate={addDays(new Date(), 45)}
                            toDate={addDays(new Date(), 85)}
                            selected={data.fecha_prevista}
                            onSelect={(value) => setData("fecha_prevista", value)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <LabelError message={errors.fecha_prevista} />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="tipo_entrega">
                        Tipo de entrega
                      </Label>
                      <RadioGroup
                        id="tipo_entrega"
                        onValueChange={(value) => setData("tipo_entrega", value)}
                        defaultValue={TipoEntrega.Rollo}
                        className="flex flex-col space-y-1"
                      >
                        {Object.entries(tipoEntregaForm).map(([, { label, value }], index) => {
                          return <div className="flex items-center space-x-3 space-y-0" key={index}>
                            <RadioGroupItem id={`tipo_entrega_${value}`} className="w-4 h-4" value={value} aria-label={label} />
                            <Label htmlFor={`tipo_entrega_${value}`} className="font-normal">
                              {label}
                            </Label>
                          </div>
                        })}
                      </RadioGroup>
                      <LabelError message={errors.tipo_entrega} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cantidad">Cantidad de unidades</Label>
                    <Input
                      value={data.cantidad}
                      id="cantidad"
                      type="number"
                      name="cantidad"
                      autoComplete="cantidad"
                      placeholder="1500"
                      onChange={(e) => setData("cantidad", e.target.valueAsNumber)}
                      required
                    />
                    <LabelError message={errors.cantidad} />
                  </div>

                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="inline-flex items-center justify-center px-4 py-2 font-medium  group-disabled:pointer-events-none">
                    <Spinner className="absolute h-5 group-enabled:opacity-0" />
                    <span className="group-disabled:opacity-0">Solicitar</span>
                  </Button>
                </CardFooter>
              </Card>
            </fieldset>
          </form>
        </section>
      </AuthenticatedLayout >
    </>
  )
}
