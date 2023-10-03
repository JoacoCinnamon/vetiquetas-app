import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Color } from "@/types/models";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Header } from "@/Components/header";
import { ModalAgregarColor } from "@/Components/colores/modal-agregar";
import { Input } from "@/Components/ui/input";

export default function TipoEtiquetaIndex({ auth, colores }: PageProps<{ colores: Color[]; }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <Header heading="Colores">
          <ModalAgregarColor />
        </Header >
      }
    >
      <Head title="Colores" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-6">
          <ColoresTable colores={colores} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}


function ColoresTable({ colores }: { colores: Color[] | [] | undefined }) {

  if (!colores || colores.length === 0) {
    return (
      <Table>
        <TableCaption>No hay colores cargados.</TableCaption>
      </Table>
    )
  }
  return (
    <Table>
      <TableCaption>Colores</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>HEX</TableHead>
          {/* <TableHead>{""}</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {colores.map((color) => (
          <TableRow key={color.id}>
            <TableCell>{color.nombre}</TableCell>
            <TableCell><div style={{
              backgroundColor: color.hex,
              width: "20px",
              height: "20px",
            }}
            />
            </TableCell>
            <TableCell className="text-right">
              {/* <ColorOperaciones color={color} /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}