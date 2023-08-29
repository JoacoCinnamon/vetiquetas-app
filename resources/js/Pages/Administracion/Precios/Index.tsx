import Layout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import formatDate from "@/utils/date";
import { Precio, PrecioWithTipoEtiqueta } from "@/types/models";

function PreciosTr({ precios }: { precios: PrecioWithTipoEtiqueta[] | [] | undefined }) {
  if (!precios || precios.length === 0) {
    return (
      <tr className="p-6 text-white">
        <td>No hay precios cargados añadidos</td>
      </tr>
    )
  }


  return precios.map(precio => {
    return (
      <tr key={precio.id}>
        <td className="px-4 py-2">{precio.medida}</td>
        <td className="px-4 py-2">{precio.cantidad_colores}</td>
        <td className="px-4 py-2">{precio.precio}</td>
        <td className="px-4 py-2">{precio.tipo_etiqueta.nombre}</td>
      </tr>
    )
  })
}

export default function PreciosIndex({ auth, precios }: PageProps<{ precios: PrecioWithTipoEtiqueta[]; }>) {
  return (
    <Layout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Precios <Link className="underline" href={route("administracion.precios.create")}>+</Link>
        </h2>
      }
    >
      <Head title="Precios" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">

              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-red-600">
                        <thead>
                          <tr className="text-neutral-500">
                            <th className="px-5 py-3 text-xs font-medium text-left uppercase">Medida (mm)</th>
                            <th className="px-5 py-3 text-xs font-medium text-left uppercase">Cantidad de colores</th>
                            <th className="px-5 py-3 text-xs font-medium text-left uppercase">Precio</th>
                            <th className="px-5 py-3 text-xs font-medium text-left uppercase">Tipo de etiqueta</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-red-600">
                          <PreciosTr precios={precios} />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </Layout>
  );
}
