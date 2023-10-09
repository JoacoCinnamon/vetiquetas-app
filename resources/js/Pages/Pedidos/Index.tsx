import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
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
import { Pedido } from "@/types/models";
import { PlusIcon } from "@radix-ui/react-icons";

function PedidosTable({ pedidos }: { pedidos: Pedido[] | [] | undefined }) {
  if (!pedidos || pedidos.length === 0) {
    return (
      <Table>
        <TableCaption>No cargó ningún diseño aún.</TableCaption>
      </Table>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        Crunch
      </div>
    </div>
  )
}
function PedidosHeader() {
  return <Header heading="Diseños" text="Todos tus diseños">
    <Link href={route("disenios.create")} className="inline-flex items-center justify-center"><PlusIcon className="absolute h-4" /></Link>
  </Header >
}

export default function DiseñosIndex({ auth, pedidos }: PageProps<{ pedidos: Pedido[] | undefined; }>) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PedidosHeader />}
    >
      <Head title="Diseños" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-6">
          <PedidosTable pedidos={pedidos} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
