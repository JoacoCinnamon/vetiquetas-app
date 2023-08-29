import { PageProps } from "@/types";
import Layout from "@/Layouts/DefaultLayout";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { TipoEtiquetaWithPrecios } from "@/types/models";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useState } from "react";


const CotizarFormSchema = z.object({
  tipoEtiquetaId: z.coerce.number({ required_error: "Ingrese el tipo de etiqueta" }),
  ancho: z.coerce.number({ required_error: "Ingrese el ancho" }).min(2, { message: "Minimo 12 milímetros" }),
  largo: z.coerce.number({ required_error: "Ingrese el largo" }).min(2, {
    message: "El mínimo de largo son 2mm",
  }).max(300, { message: "El máximo de largo son 300mm" }),
})

export default function Cotizar({
  auth,
  tipoEtiquetas
}: PageProps<{ tipoEtiquetas: TipoEtiquetaWithPrecios[] }>) {
  const [selectedTipoEtiquetaId, setSelectedTipoEtiquetaId] = useState<number | null>(null);

  const selectedTipoEtiqueta = tipoEtiquetas.find(tipoEtiqueta => tipoEtiqueta.id === selectedTipoEtiquetaId);
  const filteredPrecios = selectedTipoEtiqueta?.precios || [];

  const form = useForm<z.infer<typeof CotizarFormSchema>>({
    resolver: zodResolver(CotizarFormSchema),
    defaultValues: {
      tipoEtiquetaId: selectedTipoEtiquetaId || -1,
      ancho: -1,
      largo: 75
    },
  });

  const onSubmit = (data: z.infer<typeof CotizarFormSchema>) => {
    console.log(data);
  };

  return (
    <>
      <Layout user={auth.user} >
        <section className="h-auto preview flex min-h-[350px] w-full justify-center p-10 items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="tipoEtiquetaId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de etiqueta</FormLabel>
                    <Select
                      onValueChange={(value: string) => {
                        const newTipoEtiquetaId = parseInt(value);
                        setSelectedTipoEtiquetaId(newTipoEtiquetaId);
                        field.onChange(newTipoEtiquetaId);
                        form.resetField("ancho"); // Reset the "ancho" field value when "Tipo de etiqueta" changes
                      }}
                    >
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Seleccione el tipo de etiqueta"
                          aria-label={selectedTipoEtiqueta?.nombre}>

                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipos de etiqueta</SelectLabel>
                          {tipoEtiquetas?.map((tipoEtiqueta) => {
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
                name="ancho"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ancho (mm)</FormLabel>
                    <Select onValueChange={field.onChange}>
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
                        {selectedTipoEtiqueta &&
                          [...new Set(filteredPrecios)].map((precio) => {
                            return <SelectItem key={precio.id} value={precio.id.toString()}>
                              {precio.medida}
                            </SelectItem>
                          })
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
              <Button type="submit">Calcular</Button>
            </form>
          </Form>
        </section>
      </Layout >
    </>
  );
}