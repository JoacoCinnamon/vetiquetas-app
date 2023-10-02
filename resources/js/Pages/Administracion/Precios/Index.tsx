import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrecioWithTipoEtiqueta } from "@/types/models";
import { Header } from "@/Components/header";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import { formatPrecio } from "@/utils/currencies";
import { PlusIcon } from "@/Components/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/Components/ui/button";

function PreciosTable({ precios }: { precios: PrecioWithTipoEtiqueta[] | [] | undefined }) {
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
          <TableHead className="text-right">Tipo de etiqueta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {precios.map((precio) => (
          <TableRow key={precio.id} >
            <TableCell className="font-medium">{precio.medida}</TableCell>
            <TableCell>{precio.cantidad_colores}</TableCell>
            <TableCell>{formatPrecio(precio.precio)}</TableCell>
            <TableCell className="text-right">{precio.tipo_etiqueta.nombre}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function PreciosHeader() {
  return <Header heading="Precios" text="Todos los precios de los tipos de etiquetas">
    <Link className={cn(buttonVariants(), "inline-flex items-center justify-center")} href={route("administracion.precios.create")}>
      <PlusIcon className="absolute h-4" />
    </Link>
  </Header >
}

export default function PreciosIndex({ auth, precios }: PageProps<{ precios: PrecioWithTipoEtiqueta[]; }>) {
  console.log(precios);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PreciosHeader />}
    >
      <Head title="Precios" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-6">
          <PreciosTable precios={precios} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
