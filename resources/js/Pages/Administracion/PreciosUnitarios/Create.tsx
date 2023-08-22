import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import InputError from "@/Components/InputError";
import { FormEventHandler } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { TipoEtiqueta } from "../TipoEtiquetas/Index";

// Props de los tipos de etiquetas
export default function PrecioUnitarioCreate({ auth, tipoEtiquetas }: PageProps<{ tipoEtiquetas: TipoEtiqueta[]; }>) {
  const { data, setData, post, processing, errors } = useForm({
    nombre: "",
    cantidadColores: 1
  });
  console.log(tipoEtiquetas)
  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("administracion.etiquetas.store"));
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
      <Head title="Agregar nuevos precios" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={submit}>

                {// Faltan medidas, cantidad de colores (desplegables)
                }

                <div className="mt-4">
                  <InputLabel htmlFor="cantidadColores" value="Colores" />

                  <TextInput
                    id="cantidadColores"
                    type="number"
                    name="cantidadColores"
                    value={data.cantidadColores}
                    className="mt-1 block w-full"
                    autoComplete="current-nombre"
                    onChange={(e) => setData("cantidadColores", e.target.valueAsNumber)}
                  />

                  <InputError message={errors.cantidadColores} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                  <PrimaryButton className="ml-4" disabled={processing}>
                    Crear
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}



