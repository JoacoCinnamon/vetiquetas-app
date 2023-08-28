import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { TipoEtiqueta } from "@/types/models";

export default function TipoEtiquetaIndex({ auth, tipo_etiquetas }: PageProps<{ tipo_etiquetas: TipoEtiqueta[]; }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Tipos de etiquetas <Link className="underline" href={route("administracion.etiquetas.create")}>+</Link>
        </h2>
      }
    >
      <Head title="Tipos de etiquetas" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">

              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-neutral-200">
                        <thead>
                          <tr className="text-neutral-500">
                            <th className="px-5 py-3 text-xs font-medium text-left uppercase">Nombre</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">
                          {
                            tipo_etiquetas.length > 0
                              ? tipo_etiquetas.map(etiqueta => {
                                return (<tr key={etiqueta.id} className="dark:text-white text-neutral-50">
                                  <td className="px-5 py-4 text-sm font-medium whitespace-nowrap">{etiqueta.nombre}</td>
                                </tr>)
                              })
                              : <tr>
                                <td>No hay etiquetas aún, <Link className="underline" href={route("administracion.etiquetas.create")}>agregá</Link> alguna!</td>
                              </tr>
                          }
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



    </AuthenticatedLayout>
  );
}
