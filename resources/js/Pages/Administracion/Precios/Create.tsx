import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import InputError from "@/Components/InputError";
import { FormEventHandler, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import formatDate from "@/utils/date";
import { Precio, TipoEtiqueta, TipoEtiquetaWithPrecios } from "@/types/models";


function Precios({ precios }: { precios: Precio[] | [] | undefined }) {
  if (!precios || precios.length === 0) {
    return (
      <div className="mt-12 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg" >
        <div className="p-6 text-gray-900 dark:text-gray-100">
          <p>No hay precios cargados aún</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
      <div className="p-6 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden">
                Ultimos precios para esta etiqueta
                <table className="min-w-full divide-y divide-red-600">
                  <thead>
                    <tr className="text-neutral-500">
                      <th className="px-4 py-2 text-xs font-medium text-left uppercase">Medida</th>
                      <th className="px-4 py-2 text-xs font-medium text-left uppercase">Cantidad de colores</th>
                      <th className="px-4 py-2 text-xs font-medium text-left uppercase">Precio</th>
                      <th className="px-4 py-2 text-xs font-medium text-left uppercase">Fecha desde</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-600">
                    {
                      precios.map((precio) => (
                        <tr key={precio.id}>
                          <td className="px-4 py-2">{precio.medida}</td>
                          <td className="px-4 py-2">{precio.cantidad_colores}</td>
                          <td className="px-4 py-2">{precio.precio}</td>
                          <td className="px-4 py-2">{formatDate(precio.fecha_desde)}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const MEDIDAS = [12, 14, 16, 20, 22, 25]
const CANTIDAD_COLORES = [1, 2, 3, 4, 5, 6, 7]

export default function PrecioCreate({ auth, tipoEtiquetas }:
  PageProps<{ tipoEtiquetas: TipoEtiquetaWithPrecios[]; }>
) {

  if (!tipoEtiquetas || tipoEtiquetas.length === 0) {
    return <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Precios
        </h2>
      }
    >
      <Head title="Cambiar precios" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <p>Cargue etiquetas antes de cargar precios!</p>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout >
  }

  const { data, setData, post, processing, errors } = useForm({
    medida: 12,
    cantidad_colores: 1,
    precio: 0.1,
    tipo_etiqueta_id: tipoEtiquetas[0].id,
  });
  const precios = tipoEtiquetas.find((tipoEtiqueta) => tipoEtiqueta.id === data.tipo_etiqueta_id)?.precios

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("administracion.precios.store"))
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Precios
        </h2>
      }
    >
      <Head title="Cambiar precios" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={submit}>

                <InputLabel
                  htmlFor="tipoEtiqueta"
                  value="Tipo de etiqueta"
                />
                <select id="tipoEtiqueta"
                  value={data.tipo_etiqueta_id}
                  onChange={(e) => {
                    setData("tipo_etiqueta_id", Number(e.target.value))
                  }}
                  className="bg-gray-800"
                >
                  {tipoEtiquetas.map((tipoEtiqueta) => {
                    return <option key={tipoEtiqueta.id} value={tipoEtiqueta.id}>{tipoEtiqueta.nombre}</option>
                  })}
                </select>

                <InputError
                  message={errors.tipo_etiqueta_id}
                  className="mt-2"
                />


                <section className="md:flex md:flex-auto md:justify-between md:gap-2">
                  <div className="mt-4 md:flex md:flex-col w-full">
                    <InputLabel htmlFor="medida" value="Medida (mm)" />

                    <select id="medida"
                      value={data.medida}
                      onChange={(e) =>
                        setData("medida", Number(e.target.value))
                      }
                      className="mt-1 block w-full bg-gray-800"
                      autoComplete="medida"
                      required
                    >
                      {MEDIDAS.map((medida, index) => {
                        return <option key={index} value={medida}>{medida}</option>
                      })
                      }
                    </select>

                    <InputError
                      message={errors.medida}
                      className="mt-2"
                    />
                  </div>

                  <div className="mt-4 md:flex md:flex-col w-full">
                    <InputLabel htmlFor="cantidadColores" value="Cantidad de colores" />

                    <select id="cantidadColores"
                      value={data.cantidad_colores}
                      onChange={(e) =>
                        setData("cantidad_colores", Number(e.target.value))
                      }
                      className="mt-1 block w-full bg-gray-800"
                      autoComplete="cantidadColores"
                    >
                      {CANTIDAD_COLORES.map((cantidadColores, index) => {
                        return <option key={index} value={cantidadColores}>{cantidadColores}</option>
                      })
                      }
                    </select>

                    <InputError
                      message={errors.cantidad_colores}
                      className="mt-2"
                    />
                  </div>

                  <div className="mt-4 md:flex md:flex-col w-full">
                    <InputLabel htmlFor="precio" value="Precio" />

                    <TextInput
                      id="precio"
                      name="precio"
                      value={data.precio}
                      type="number"
                      min="0.1"
                      step="any"
                      className="mt-1 block w-full"
                      autoComplete="precio"
                      isFocused={true}
                      onChange={(e) =>
                        setData("precio", e.target.valueAsNumber)
                      }
                      required
                    />

                    <InputError
                      message={errors.precio}
                      className="mt-2"
                    />
                  </div>
                </section>

                <div className="flex items-center justify-end mt-4">
                  <PrimaryButton className="ml-4" disabled={processing}>
                    {processing ? "Cargando..." : "Agregar precio"}
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>

          <Precios precios={precios} />
        </div>
      </div>
    </AuthenticatedLayout >
  );
}



