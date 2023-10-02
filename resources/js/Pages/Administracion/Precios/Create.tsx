import Layout from "@/Layouts/DefaultLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import formatDate from "@/utils/date";
import { CANTIDAD_COLORES, MEDIDAS, Precio, TipoEtiquetaWithPrecios } from "@/types/models";
import { Header } from "@/Components/header";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { formatPrecio } from "@/utils/currencies";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { Label, LabelError } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Spinner } from "@/Components/spinner";


export default function PrecioCreate({ auth, tipoEtiquetas }:
  PageProps<{ tipoEtiquetas: TipoEtiquetaWithPrecios[]; }>
) {

  if (!tipoEtiquetas || tipoEtiquetas.length === 0) {
    return <Layout
      user={auth.user}
      header={<Header heading="Precios" />
      }
    >
      <Head title="Cambiar precios" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 ">
              <p>Cargue etiquetas antes de cargar precios!</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  }

  const { data, setData, post, processing, errors, reset } = useForm({
    medida: 12,
    cantidad_colores: 1,
    precio: 0.1,
    tipo_etiqueta_id: tipoEtiquetas[0].id,
    porcentaje: 10
  });
  const precios = tipoEtiquetas.find((tipoEtiqueta) => tipoEtiqueta.id === data.tipo_etiqueta_id)?.precios

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("administracion.precios.store"));
    reset("medida", "cantidad_colores");
  };

  const onAumentoSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("administracion.precios.aumentar"));
  };

  return (
    <Layout
      user={auth.user}
      header={
        <Header heading="Precios" />
      }
    >
      <Head title="Cambiar precios" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-4">
              <form onSubmit={onAumentoSubmit} className="w-full">
                <fieldset disabled={processing} className="group">
                  <Card>
                    <CardHeader>
                      Aumentar todos los precios
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="porcentaje">Porcentaje</Label>
                        <Input value={data.porcentaje}
                          id="porcentaje"
                          name="porcentaje"
                          autoComplete="porcentaje"
                          type="number"
                          min="0.1"
                          step="any"
                          onChange={(e) => setData("porcentaje", e.target.valueAsNumber)}
                          required
                        />
                        <LabelError message={errors.porcentaje} />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button className="inline-flex items-center justify-center px-4 py-2 font-medium  group-disabled:pointer-events-none">
                        <Spinner className="absolute h-5 group-enabled:opacity-0" />
                        <span className="group-disabled:opacity-0">Aumentar</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </fieldset>
              </form>
            </div>
            <div className="p-4">
              <form onSubmit={onSubmit} className="w-full">
                <fieldset disabled={processing} className="group">
                  <Card>
                    <CardHeader>
                      Agregar un nuevo precio
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <div className="grid md:grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>Tipo de etiqueta</Label>
                          <Select
                            value={data.tipo_etiqueta_id.toString()}
                            onValueChange={(value: string) => { setData("tipo_etiqueta_id", parseInt(value)); }}
                            required
                          >
                            <SelectTrigger aria-label="Tipo de etiqueta">
                              <SelectValue placeholder="Seleccione el tipo de etiqueta">
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
                          <LabelError message={errors.tipo_etiqueta_id} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="medida">Medida (mm)</Label>
                          <Select
                            value={data.medida.toString()}
                            onValueChange={(value: string) => setData("medida", parseInt(value))}
                            required
                          >
                            <SelectTrigger aria-label="Medida">
                              <SelectValue
                                placeholder="Seleccione la medida del ancho"
                              >
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Medidas</SelectLabel>
                                {MEDIDAS?.map((medida, index) => {
                                  return <SelectItem key={index} value={medida.toString()}>
                                    {medida}
                                  </SelectItem>
                                })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <LabelError message={errors.medida} />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-2">


                        <div className="space-y-2">
                          <Label htmlFor="cantidad_colores">Cantidad de colores</Label>
                          <Select
                            value={data.cantidad_colores.toString()}
                            onValueChange={(value: string) => setData("cantidad_colores", parseInt(value))}
                            required
                          >
                            <SelectTrigger aria-label="Cantidad de colores">
                              <SelectValue
                                placeholder="Seleccione la cantidad de colores"
                              >
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Cantidad de colores</SelectLabel>
                                {CANTIDAD_COLORES?.map((color, index) => {
                                  return <SelectItem key={index} value={color.toString()}>
                                    {color}
                                  </SelectItem>
                                })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <LabelError message={errors.cantidad_colores} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="precio">Precio</Label>
                          <Input value={data.precio}
                            id="precio"
                            name="precio"
                            autoComplete="precio"
                            type="number"
                            min="0.1"
                            step="any"
                            onChange={(e) => setData("precio", e.target.valueAsNumber)}
                            required
                          />
                          <LabelError message={errors.precio} />
                        </div>
                      </div>

                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button className="inline-flex items-center justify-center px-4 py-2 font-medium  group-disabled:pointer-events-none">
                        <Spinner className="absolute h-5 group-enabled:opacity-0" />
                        <span className="group-disabled:opacity-0">Agregar</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </fieldset>
              </form>
            </div>
          </div>

          <section className="py-12">
            <PreciosTable precios={precios} />
          </section>
        </div>
      </div>
    </Layout >
  );
}

function PreciosTable({ precios }: { precios: Precio[] | [] | undefined }) {
  if (!precios || precios.length === 0) {
    return (
      <Table>
        <TableCaption>No hay precios cargados.</TableCaption>
      </Table>
    )
  }

  return (
    <Table>
      <TableCaption>Precios.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Medida (mm)</TableHead>
          <TableHead>Cantidad de colores</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead className="text-right">Fecha de creación</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {precios.map((precio) => (
          <TableRow key={precio.id} >
            <TableCell className="font-medium">{precio.medida}</TableCell>
            <TableCell>{precio.cantidad_colores}</TableCell>
            <TableCell>{formatPrecio(precio.precio)}</TableCell>
            <TableCell className="text-right">{formatDate(precio.fecha_desde)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


