import { PageProps } from "@/types";
import Layout from "@/Layouts/DefaultLayout";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import * as z from "zod"

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
import { CANTIDAD_COLORES, MEDIDAS, TIPO_ENTREGA, TIPO_ENTREGA_PORCENTAJES, TipoEtiquetaWithPrecios } from "@/types/models";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Header } from "@/Components/header";
import { useState } from "react";
import { formatPrecio } from "@/utils/currencies";

const CotizarFormSchema = z.object({
  tipoEtiquetaId: z.coerce.number({ required_error: "Ingrese el tipo de etiqueta" })
    .min(1, { message: "Ingrese el tipo de etiqueta" }),
  cantidadColores: z.coerce.number({ required_error: "Ingrese la cantidad de colores" })
    .min(1, { message: "Ingrese la cantidad de colores" })
    .max(7, { message: "Ingrese la cantidad de colores" }),
  ancho: z.coerce.number({ required_error: "Ingrese el ancho" })
    .min(2, { message: "Ingrese el ancho" }),
  largo: z.coerce.number({ invalid_type_error: "Ingrese un número", required_error: "Ingrese el largo" })
    .min(2, { message: "El mínimo de largo son 2mm", })
    .max(300, { message: "El máximo de largo son 300mm" }),
  tipoEntrega: z.enum(TIPO_ENTREGA, {
    required_error: "Elija un tipo de entrega.",
    invalid_type_error: "Elija un tipo de entrega.",
  }),
  cantidadUnidades: z.coerce.number({ invalid_type_error: "Ingrese un número", required_error: "Ingrese la cantidad de unidades" })
    .min(1500, { message: "El mínimo de cantidad de unidades son 1500", })
})

export default function Cotizar({
  auth,
  tipoEtiquetas
}: PageProps<{ tipoEtiquetas: TipoEtiquetaWithPrecios[] }>) {
  const form = useForm<z.infer<typeof CotizarFormSchema>>({
    resolver: zodResolver(CotizarFormSchema),
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

  const [precioUnitario, setPrecioUnitario] = useState<number | null>(null);
  const precioTotal = precioUnitario
    ? precioUnitario * form.getValues("cantidadUnidades")
    : 0;

  if (filteredTipoEtiquetas.length === 0) {
    return <Layout user={auth.user}>
      <section className="h-auto preview flex min-h-[350px] w-full justify-center p-10 items-center">
        Aún faltan precios por cargar para los tipos de etiquetas...
      </section>
    </Layout>
  }


  const onSubmit = (data: z.infer<typeof CotizarFormSchema>) => {
    const { cantidadColores, ancho, largo, tipoEntrega } = data;
    const precio = filteredPrecios.find(p => (p.medida === ancho && p.cantidad_colores === cantidadColores));
    if (!precio) return;
    const tipoEntregaAumento = TIPO_ENTREGA_PORCENTAJES[tipoEntrega];
    const precioUnitario = (precio.precio * tipoEntregaAumento) / (1000 / largo);
    setPrecioUnitario(precioUnitario);

  }

  return (
    <>
      <Layout
        user={auth.user}
        header={<Header heading="Cotizador" text="Cotize sus etiquetas según sus necesidades." />}
      >
        <section className="h-auto preview flex min-h-[350px] w-full justify-center p-10 items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>
                  </CardTitle>
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
                              form.resetField("ancho"); // Reset the "ancho" field value when "Tipo de etiqueta" changes
                              field.onChange(newTipoEtiquetaId);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione el tipo de etiqueta"
                                aria-label={selectedTipoEtiqueta?.nombre}>
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
                          <Select onValueChange={field.onChange} disabled={filteredPrecios.length < 1}>
                            <FormControl>
                              <SelectTrigger>
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
                          <Select onValueChange={field.onChange} disabled={filteredPrecios.length < 1}>
                            <FormControl>
                              <SelectTrigger>
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
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="rollo" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  En rollo
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="rollo_apresto" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  En rollo + apresto (+10%)
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="cortada" />
                                </FormControl>
                                <FormLabel className="font-normal">Cortada (+15%)</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="cortada_apresto" />
                                </FormControl>
                                <FormLabel className="font-normal">Cortada + apresto (+20%)</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="cortada_doblada_medio" />
                                </FormControl>
                                <FormLabel className="font-normal">Cortada y doblada al medio (+25%)</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="cortada_doblada_puntas" />
                                </FormControl>
                                <FormLabel className="font-normal">Cortada y doblada en las puntas (+25%)</FormLabel>
                              </FormItem>
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
                    precioUnitario && <div>
                      <h1>Cada etiqueta te cuesta: </h1> <span>{formatPrecio(precioUnitario)} pesos</span>
                      <h1>Total a pagar: </h1> <span>{formatPrecio(precioTotal)} pesos</span>
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
