import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, router } from "@inertiajs/react";
import { useForm as useInertiaForm } from '@inertiajs/react';
import { PageProps } from "@/types";
import { Header } from "@/Components/header";

import { CANTIDAD_COLORES, Color, Diseño, MEDIDAS, TipoEtiquetaWithPrecios } from "@/types/models";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";

import { Label, LabelError } from "@/Components/ui/label";
import { FormEventHandler, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Spinner } from "@/Components/spinner";


export default function DiseñosCreate({
  auth,
  diseño,
  tipoEtiquetas,
  colores
}: PageProps<{ diseño: Diseño, tipoEtiquetas: TipoEtiquetaWithPrecios[], colores: Color[] }>) {
  const { errors, setData, data, reset } = useInertiaForm<{
    nombre: string,
    tipo_etiqueta_id: number,
    color_fondo_id: number,
    ancho: number,
    largo: number,
    foto: File | null
    colores: { id: number }[]
  }>
    ({
      nombre: diseño.nombre ?? "",
      tipo_etiqueta_id: diseño.tipo_etiqueta_id ?? -1,
      color_fondo_id: diseño.color_fondo_id ?? -1,
      ancho: diseño.ancho ?? -1,
      largo: diseño.largo ?? 0,
      foto: null,
      colores: diseño.colores ?? [{ id: -1 }]
    });
  const [processing, setProcessing] = useState(false);

  const filteredTipoEtiquetas = tipoEtiquetas
    ?.filter(tipoEtiqueta => tipoEtiqueta.precios?.length === MEDIDAS.length * CANTIDAD_COLORES.length)
  const selectedTipoEtiqueta = filteredTipoEtiquetas.find(tipoEtiqueta => tipoEtiqueta.id === data.tipo_etiqueta_id);
  const filteredPrecios = selectedTipoEtiqueta?.precios || [];

  if (filteredTipoEtiquetas.length === 0) {
    return <AuthenticatedLayout user={auth.user}>
      <section className="h-auto preview flex min-h-[350px] w-full justify-center p-10 items-center">
        Aún faltan precios por cargar para los tipos de etiquetas...
      </section>
    </AuthenticatedLayout>
  }

  // Función para agregar un nuevo color
  const addColor = () => {
    if (data.colores.length < CANTIDAD_COLORES.length) {
      setData("colores", [...data.colores, { id: -1 }]);
    }
  };
  // Función para eliminar un color
  const removeColor = (index: number) => {
    const updatedColors = [...data.colores];
    updatedColors.splice(index, 1);
    setData("colores", updatedColors);
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const { nombre, tipo_etiqueta_id, color_fondo_id, colores, ancho, largo, foto } = data;
    const precio = filteredPrecios.find(p => (p.medida === ancho && p.cantidad_colores === data.colores.length));
    if (!precio) return;

    /**
     * https://inertiajs.com/file-uploads#multipart-limitations
     * put(route("disenios.update", { id: diseño.id })) <-- No se puede hacer así
     */
    router.post(`/disenios/${diseño.id}`, {
      _method: 'put',
      nombre,
      tipo_etiqueta_id,
      color_fondo_id,
      colores,
      ancho,
      largo,
      foto
    }, {
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false),
    })

  }

  return (
    <>
      <AuthenticatedLayout
        user={auth.user}
        header={<Header heading="Diseños" text="Edite su diseño." />}
      >
        <Head title="Diseños" />
        <section className="h-auto preview flex min-h-[350px] w-full justify-center p-6 items-center">
          <form onSubmit={onSubmit} className="w-full lg:w-2/5">
            <fieldset disabled={processing} className="group">
              <Card>
                <CardHeader>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre del diseño</Label>
                    <Input value={data.nombre}
                      id="nombre"
                      name="nombre"
                      autoComplete="nombre"
                      placeholder="Vetiqueta"
                      onChange={(e) => setData("nombre", e.target.value)}
                      required
                    />
                    <LabelError message={errors.nombre} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>Tipo de etiqueta</Label>
                      <Select
                        value={data.tipo_etiqueta_id.toString()}
                        onValueChange={(value: string) => {
                          reset("ancho");
                          setData("tipo_etiqueta_id", parseInt(value));
                        }}
                        required
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
                      <LabelError message={errors.tipo_etiqueta_id} />
                    </div>

                    <div className="space-y-2">
                      <Label>Color de fondo</Label>
                      <Select
                        value={data.color_fondo_id.toString()}
                        onValueChange={(value: string) => setData("color_fondo_id", parseInt(value))}
                        required
                      >
                        <SelectTrigger aria-label="Color de fondo">
                          <SelectValue
                            placeholder="Seleccione el color de fondo"
                          >
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Colores</SelectLabel>
                            {colores?.map((color) => {
                              return <SelectItem key={color.id} value={color.id.toString()}>
                                <div className="border" style={{
                                  backgroundColor: color.hex,
                                  width: "100px",
                                  height: "25px",
                                }}
                                />
                                <span>{color.nombre}</span>
                              </SelectItem>
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <LabelError message={errors.tipo_etiqueta_id} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-2">
                    {data.colores.map((color, index) => {
                      // @ts-ignore 
                      const colorError = errors[`colores.${index}.id`] as string | undefined;
                      return (
                        <div key={index} className="space-y-2">
                          <Label>Color {index + 1}</Label>
                          <Select
                            value={color.id.toString()}
                            // Importante para la validación de arrays en Laravel
                            name={`colores[${index}][id]`}
                            onValueChange={(value: string) => {
                              const updatedColors = [...data.colores];
                              updatedColors[index].id = parseInt(value);;
                              setData("colores", updatedColors);
                            }}
                            required
                          >
                            <SelectTrigger id={`colores[${index}][id]`} aria-label={`Color ${index + 1}`}>
                              <SelectValue
                                placeholder={`Seleccione el color ${index + 1}`}
                                aria-label={colores.find(c => c.id === color.id)?.nombre || ""}
                              >
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Colores</SelectLabel>
                                {colores?.map((color) => (
                                  <SelectItem key={color.id} value={color.id.toString()}>
                                    <div className="flex flex-1 justify-center items-center gap-2">
                                      <div className="border" style={{
                                        backgroundColor: color.hex,
                                        width: "100px",
                                        height: "25px",
                                      }}
                                      />
                                      <span>{color.nombre}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <LabelError message={colorError} />
                          {(index === data.colores.length - 1 && index !== 0) && (
                            <Button
                              onClick={() => removeColor(index)}
                              variant="link"
                              className="mt-2 text-destructive"
                            >
                              Eliminar último color
                            </Button>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {data.colores.length < CANTIDAD_COLORES.length && (
                    <Button
                      type="button"
                      onClick={addColor}
                      variant="outline"
                      className="mt-2"
                    >
                      Agregar color
                    </Button>
                  )}

                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="ancho">Ancho (mm)</Label>
                      <Select
                        value={data.ancho.toString()}
                        onValueChange={(value: string) => {
                          setData("ancho", parseInt(value));
                        }}
                        disabled={filteredPrecios.length < 1}
                      >
                        <SelectTrigger id="ancho" name="ancho" aria-label="Ancho de la etiqueta">
                          <SelectValue
                            placeholder={filteredPrecios
                              ? "Seleccione el ancho de la etiqueta"
                              : "No hay medidas cargadas"
                            }
                          />
                        </SelectTrigger>
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
                      <LabelError message={errors.ancho} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="largo">Largo (mm)</Label>
                      <Input value={data.largo}
                        id="largo"
                        name="largo"
                        autoComplete="largo"
                        type="number"
                        onChange={(e) =>
                          setData("largo", e.target.valueAsNumber)
                        }
                        placeholder="75"
                        required
                      />
                      <LabelError message={errors.largo} />
                    </div>
                  </div>


                  {data.foto ? (
                    <picture>
                      <source srcSet={URL.createObjectURL(data.foto)} />
                      <img src={URL.createObjectURL(data.foto)} alt={`Foto del diseño de ${diseño.nombre}`} />
                    </picture>
                  ) : (
                    <picture>
                      <source srcSet={diseño.foto_path} />
                      <img src={diseño.foto_path} alt={`Foto del diseño de ${diseño.nombre}`} />
                    </picture>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="foto">
                      Suba una nueva foto de su diseño (opcional)
                    </Label>
                    <Input
                      id="foto"
                      name="foto"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="file:text-foreground"
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement & { files: FileList };
                        setData("foto", target.files[0]);
                      }}
                    />
                    <LabelError message={errors.foto} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="inline-flex items-center justify-center px-4 py-2 font-medium  group-disabled:pointer-events-none">
                    <Spinner className="absolute h-5 group-enabled:opacity-0" />
                    <span className="group-disabled:opacity-0">Editar</span>
                  </Button>
                </CardFooter>
              </Card>
            </fieldset>
          </form>
        </section>
      </AuthenticatedLayout>
    </>
  )
}
