import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { TipoEtiqueta } from "../TipoEtiquetas/Index";

type PrecioUnitario = {
  id: number;
  tipoEtiqueta: TipoEtiqueta;
  ancho: string;
  cantidadColores: number;
  precio: number;
  creado_en: string;
  actualizado_en: string;
}
export default function PreciosUnitarioIndex({ auth, precios }: PageProps<{ precios: PrecioUnitario[]; }>) {
  return (
    <AuthenticatedLayout
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
                      <table className="min-w-full divide-y divide-neutral-200">
                        <thead>
                          <tr className="text-neutral-500">
                            <th className="px-5 py-3 text-xs font-medium text-left uppercase">Nombre</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">

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
