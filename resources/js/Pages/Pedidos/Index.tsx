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
import { Pedido, getPedidoEstado, getTipoEntrega } from "@/types/models";
import { PlusIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/Components/ui/button";
import { formatPrecio } from "@/utils/currencies";
import formatDate from "@/utils/date";
import { Badge } from "@/Components/ui/badge";

function PedidosTable({ pedidos }: { pedidos: Pedido[] | [] | undefined }) {
  if (!pedidos || pedidos.length === 0) {
    return (
      <Table>
        <TableCaption>No cargó ningún pedido aún.</TableCaption>
      </Table>
    )
  }
  console.log(pedidos)
  return (
    <Table>
      <TableCaption>Pedidos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Descripción</TableHead>
          <TableHead className="w-[100px]">Diseño</TableHead>
          <TableHead>Precio total</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Tipo de entrega</TableHead>
          <TableHead>Fecha pedida</TableHead>
          <TableHead>Fecha entregada</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pedidos.map((pedido) => (
          <TableRow key={pedido.id}>
            <TableCell>{pedido.descripcion}</TableCell>
            <TableCell>{pedido.diseño.nombre}</TableCell>
            <TableCell>{formatPrecio(pedido.precio)}</TableCell>
            <TableCell>{pedido.cantidad}</TableCell>
            <TableCell className="uppercase"><Badge>{getPedidoEstado(pedido.estado).label}</Badge></TableCell>
            <TableCell>{getTipoEntrega(pedido.tipo_entrega).label}</TableCell>
            <TableCell>{formatDate(pedido.fecha_pedido)}</TableCell>
            <TableCell>{pedido.fecha_entrega ? formatDate(pedido.fecha_entrega) : "No se entregó"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  )
}
function PedidosHeader() {
  return <Header heading="Pedidos" text="Todos tus pedidos">
    <Link href={route("pedidos.create")} className={cn(buttonVariants(), "inline-flex items-center justify-center")}>
      <PlusIcon className="absolute h-4" />
    </Link>
  </Header >
}

export default function PedidosIndex({ auth, pedidos }: PageProps<{ pedidos: Pedido[] | undefined; }>) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PedidosHeader />}
    >
      <Head title="Pedidos" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-6">
          <PedidosTable pedidos={pedidos} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
