import { PageProps } from "@/types";
import Layout from "@/Layouts/DefaultLayout";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"

import { Button } from "@/Components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import { CANTIDAD_COLORES, MEDIDAS, TipoEtiquetaWithPrecios } from "@/types/models";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { Header } from "@/Components/header";
import { useState } from "react";
import { formatPrecio } from "@/utils/currencies";
import { CotizacionFormSchema, cotizacionFormSchema, tipoEntregaForm } from "@/lib/validations/cotizacion";
import { Head } from "@inertiajs/react";

export default function Cotizar({
  auth,
  tipoEtiquetas
}: PageProps<{ tipoEtiquetas: TipoEtiquetaWithPrecios[] }>) {
  const form = useForm<CotizacionFormSchema>({
    resolver: zodResolver(cotizacionFormSchema),
    defaultValues: {
      tipoEtiquetaId: -1,
      cantidadColores: -1,
      ancho: -1,
      largo: 0,
      cantidadUnidades: 1500
    },
  });
  const filteredTipoEtiquetas = tipoEtiquetas
    ?.filter(tipoEtiqueta => tipoEtiqueta.precios?.length === MEDIDAS.length * CANTIDAD_COLORES.length)
  const selectedTipoEtiqueta = filteredTipoEtiquetas.find(tipoEtiqueta => tipoEtiqueta.id === form.getValues().tipoEtiquetaId);
  const filteredPrecios = selectedTipoEtiqueta?.precios || [];

  const [precios, setPrecios] = useState<{ precioUnitario: number, precioTotal: number } | null>(null);

  if (filteredTipoEtiquetas.length === 0) {
    return <Layout user={auth.user}>
      <section className="h-auto preview flex min-h-[350px] w-full justify-center p-10 items-center">
        Aún faltan precios por cargar para los tipos de etiquetas...
      </section>
    </Layout>
  }


  const onSubmit = (data: CotizacionFormSchema) => {
    const { cantidadColores, ancho, largo, tipoEntrega, cantidadUnidades } = data;
    const precio = filteredPrecios.find(p => (p.medida === ancho && p.cantidad_colores === cantidadColores));
    if (!precio) return;
    const { incrementa: tipoEntregaAumento } = tipoEntregaForm[tipoEntrega];
    const precioUnitario = (precio.precio * tipoEntregaAumento) / (1000 / largo);
    const precioTotal = precioUnitario * cantidadUnidades;
    setPrecios({ precioUnitario, precioTotal });
  }

  return (
    <>
      <Layout
        user={auth.user}
        header={<Header heading="Cotizador" text="Cotize sus etiquetas según sus necesidades." />}
      >
        <Head title="Cotizar">
          <meta name="description" content="Cotizadora de pedidos de etiquetas bordadas" />
        </Head>
        <section className="h-auto preview flex min-h-[350px] w-full justify-center p-6 items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-2/5">
              <Card>
                <CardHeader>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="tipoEtiquetaId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de etiqueta</FormLabel>
                          <Select
                            onValueChange={(value: string) => {
                              const newTipoEtiquetaId = parseInt(value);
                              form.resetField("ancho", { keepError: true }); // Reset the "ancho" field value when "Tipo de etiqueta" changes
                              field.onChange(newTipoEtiquetaId);
                            }}
                          >
                            <SelectTrigger aria-label="Tipo de etiqueta">
                              <SelectValue
                                placeholder="Seleccione el tipo de etiqueta"
                                aria-label={selectedTipoEtiqueta?.nombre}
                              >
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Tipos de etiqueta</SelectLabel>
                                {filteredTipoEtiquetas?.map((tipoEtiqueta) => {
                                  return <SelectItem key={tipoEtiqueta.id} value={tipoEtiqueta.id.toString()}>
                                    {tipoEtiqueta.nombre}
                                  </SelectItem>
                                })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cantidadColores"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cantidad de colores</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            disabled={filteredPrecios.length < 1}
                          >
                            <FormControl>
                              <SelectTrigger aria-label="Cantidad de colores">
                                <SelectValue
                                  placeholder={"Seleccione la cantidad de colores"}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {filteredPrecios.length > 0
                                ? CANTIDAD_COLORES.map((cantidadColor) => {
                                  return <SelectItem key={cantidadColor} value={cantidadColor.toString()}>
                                    {cantidadColor}
                                  </SelectItem>
                                })
                                : <SelectItem value="-1">
                                  No hay medidas cargadas aún
                                </SelectItem>
                              }
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="ancho"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ancho (mm)</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            disabled={filteredPrecios.length < 1}
                          >
                            <FormControl>
                              <SelectTrigger aria-label="Ancho de la etiqueta">
                                <SelectValue
                                  placeholder={filteredPrecios
                                    ? "Seleccione el ancho de la etiqueta"
                                    : "No hay medidas cargadas"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {filteredPrecios.length > 0
                                ? MEDIDAS.map((medida) => {
                                  return <SelectItem key={medida} value={medida.toString()}>
                                    {medida}
                                  </SelectItem>
                                })
                                : <SelectItem value="-1">
                                  No hay medidas cargadas aún
                                </SelectItem>
                              }
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="largo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Largo (mm)</FormLabel>
                          <FormControl>
                            <Input placeholder="75" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="tipoEntrega"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Tipo de entrega</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              {Object.entries(tipoEntregaForm).map(([tipoEntregaValue, { label }], index) => {
                                return <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                  <FormControl className="w-4 h-4">
                                    <RadioGroupItem value={tipoEntregaValue} aria-label={label} />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {label}
                                  </FormLabel>
                                </FormItem>
                              })}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="cantidadUnidades"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cantidad de unidades</FormLabel>
                          <FormControl>
                            <Input placeholder="1500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {
                    precios && <div>
                      <h2>Cada etiqueta te cuesta: </h2> <span>{formatPrecio(precios.precioUnitario)} pesos</span>
                      <h2>Total a pagar: </h2> <span>{formatPrecio(precios.precioTotal)} pesos</span>
                    </div>
                  }
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Calcular</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </section>
      </Layout>
    </>
  );
}
