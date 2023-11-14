import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps, User } from "@/types";
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
import { Pedido, PedidoEstado, getPedidoEstado, getTipoEntrega } from "@/types/models";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/Components/ui/button";
import { formatPrecio } from "@/utils/currencies";
import formatDate from "@/utils/date";
import { Badge } from "@/Components/ui/badge";
import { PedidoOperaciones } from "@/Components/pedidos/acciones";
import { PlusIcon } from "@/Components/icons";
import { ReaderIcon } from "@radix-ui/react-icons";


type PedidoWithUser = Pedido & { user: Pick<User, "id" | "nombre" | "apellido"> };

export default function PedidosIndex({ auth, pedidos }: PageProps<{ pedidos: PedidoWithUser[] | undefined; }>) {

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


function PedidosTable({ pedidos }: { pedidos: PedidoWithUser[] | [] | undefined }) {
  if (!pedidos || pedidos.length === 0) {
    return (
      <Table>
        <TableCaption>No cargó ningún pedido aún.</TableCaption>
      </Table>
    )
  }

  return (
    <Table>
      <TableCaption>Pedidos de etiquetas.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Usuario</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead className="w-[100px]">Diseño</TableHead>
          <TableHead>Precio total</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Tipo de entrega</TableHead>
          <TableHead>Fecha pedida</TableHead>
          <TableHead>Fecha entregada</TableHead>
          <TableHead>{""}</TableHead>
          <TableHead>{""}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pedidos.map((pedido) => (
          <TableRow key={pedido.id}>
            <TableCell>{pedido.user.nombre} {pedido.user.apellido}</TableCell>
            <TableCell>{pedido.descripcion}</TableCell>
            <TableCell>{pedido.diseño.nombre}</TableCell>
            <TableCell>{formatPrecio(pedido.precio)}</TableCell>
            <TableCell>{pedido.cantidad}</TableCell>
            <TableCell className="uppercase">
              <Badge variant={pedido.estado === PedidoEstado.Cancelado ? "destructive" : "default"}>
                {getPedidoEstado(pedido.estado).label}
              </Badge>
            </TableCell>
            <TableCell>{getTipoEntrega(pedido.tipo_entrega).label}</TableCell>
            <TableCell>{formatDate(pedido.fecha_pedido)}</TableCell>
            <TableCell>{pedido.fecha_entrega ? formatDate(pedido.fecha_entrega) : "No se entregó"}</TableCell>
            <TableCell className="text-right">
              {
                (pedido.estado === PedidoEstado.Pedido || pedido.estado === PedidoEstado.Procesado)
                && <PedidoOperaciones pedido={pedido} />
              }
            </TableCell>
            <TableCell className="text-right">
              <a href={route("pedidos.pdf", pedido.id)} className={cn(buttonVariants({ variant: "outline" }), "h-8 w-8 p-0")} target="_blank" rel="noreferrer">
                <ReaderIcon className="h-4 w-4" />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
function PedidosHeader() {
  return <Header heading="Pedidos" text="Todos tus pedidos">
    <Link href={route("pedidos.create")} className={cn(buttonVariants(), "inline-flex items-center justify-center")}>
      <PlusIcon className="absolute h-4" />
    </Link>
  </Header>
}