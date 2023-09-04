import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { TipoEtiqueta } from "@/types/models";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import formatDate from "@/utils/date";
import { Header } from "@/Components/header";

function EtiquetasTable({ tipo_etiquetas }: { tipo_etiquetas: TipoEtiqueta[] | [] | undefined }) {

  if (!tipo_etiquetas || tipo_etiquetas.length === 0) {
    return (
      <Table>
        <TableCaption>No hay tipos de etiquetas cargadas.</TableCaption>
      </Table>
    )
  }
  return (
    <Table>
      <TableCaption>Tipos de etiquetas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha de creación</TableHead>
          <TableHead className="text-right">Tipo de etiqueta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tipo_etiquetas.map((tipoEtiqueta) => (
          <TableRow key={tipoEtiqueta.id}>
            <TableCell>{formatDate(tipoEtiqueta.creado_el)}</TableCell>
            <TableCell className="text-right">{tipoEtiqueta.nombre}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function TipoEtiquetaIndex({ auth, tipo_etiquetas }: PageProps<{ tipo_etiquetas: TipoEtiqueta[]; }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <Header heading="Tipo de etiquetas" text="Todos los tipos de etiquetas cargados">
          <Link className="underline" href={route("administracion.etiquetas.create")}>+</Link>
        </Header >
      }
    >
      <Head title="Tipos de etiquetas" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-6">
          <EtiquetasTable tipo_etiquetas={tipo_etiquetas} />
        </div>
      </div>
    </AuthenticatedLayout >
  );
}
