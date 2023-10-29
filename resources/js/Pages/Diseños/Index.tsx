import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Header } from "@/Components/header";

import {
  Table,
  TableCaption,
} from "@/Components/ui/table"
import { Diseño } from "@/types/models";
import { Button, buttonVariants } from "@/Components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { DiseñosOperaciones } from "@/Components/diseños/acciones";
import { cn } from "@/lib/utils";

export type DiseñoYOperacion = Diseño & { can: { editAndDelete: boolean } };

export default function DiseñosIndex({ auth, diseños }: PageProps<{ diseños: DiseñoYOperacion[] | [] | undefined; }>) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<DiseñosHeader />}
    >
      <Head title="Diseños" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-6">
          <DiseñosTable diseños={diseños} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function DiseñosHeader() {
  return <Header heading="Diseños" text="Todos tus diseños">
    <Link href={route("disenios.create")} className={cn(buttonVariants(), "inline-flex items-center justify-center")}>
      <PlusIcon className="absolute h-4" />
    </Link>
  </Header >
}

function DiseñosTable({ diseños }: { diseños: DiseñoYOperacion[] | [] | undefined }) {
  if (!diseños || diseños.length === 0) {
    return (
      <Table>
        <TableCaption>No cargó ningún diseño aún.</TableCaption>
      </Table>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {diseños.map((diseño) => (
          <Card key={diseño.id} className="group relative">
            <CardHeader>
              <CardTitle>{diseño.nombre}</CardTitle>
              <CardDescription>
                {diseño.ancho} x {diseño.largo}
              </CardDescription>
              {diseño.can.editAndDelete && <DiseñosOperaciones diseño={diseño} key={diseño.id} />}
            </CardHeader>
            <CardContent className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-90 lg:h-80">
                    <img
                      src={diseño.foto_path}
                      alt={diseño.nombre}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}