import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Color } from "@/types/models";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Header } from "@/Components/header";
import { ModalAgregarColor } from "@/Components/colores/modal-agregar";
import { ColorOperaciones } from "@/Components/colores/acciones";

export type ColorYOperacion = Color & { can: { editAndDelete: boolean } };

export default function ColoresIndex({ auth, colores }: PageProps<{ colores: ColorYOperacion[]; }>) {
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


function ColoresTable({ colores }: { colores: ColorYOperacion[] | [] | undefined }) {

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
          <TableHead className="text-left">Color</TableHead>
          <TableHead>Código</TableHead>
          <TableHead>{""}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {colores.map((color) => (
          <TableRow key={color.id}>
            <TableCell>{color.nombre}</TableCell>
            <TableCell className="text-left">
              <div className="border" style={{
                backgroundColor: color.hex,
                width: "25px",
                height: "25px",
              }}
              />
            </TableCell>
            <TableCell>{color.codigo}</TableCell>
            <TableCell className="text-right">
              {color.can.editAndDelete && <ColorOperaciones color={color} key={color.id} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}