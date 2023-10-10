export type Precio = {
  id: number;
  /**
   * Ancho en milímetros
   */
  medida: typeof MEDIDAS[number];
  cantidad_colores: typeof CANTIDAD_COLORES[number];
  precio: number
  tipo_etiqueta_id: number
  fecha_desde: string
  fecha_hasta: string | null
}

export type PrecioWithTipoEtiqueta = Precio & {
  tipo_etiqueta: Pick<TipoEtiqueta, "id" | "nombre">
}

export type TipoEtiqueta = {
  id: number;
  nombre: string;
  creado_el: string
  actualizado_el: string;
}

export type TipoEtiquetaWithPrecios = TipoEtiqueta & {
  precios: Precio[] | [] | undefined
}

export const MEDIDAS = [12, 16, 20, 25, 33, 40, 50, 60] as const;
export const CANTIDAD_COLORES = [1, 2, 3] as const;


export type Diseño = {
  id: number;
  user_id: number;
  color_fondo_id: number;
  tipo_etiqueta_id: number;
  nombre: string;
  colores: { id: number, nombre: string, hex: `#${string}` }[];
  ancho: typeof MEDIDAS[number];
  largo: number;
  foto_path: string;
  creado_el: string
  actualizado_el: string;
}

export type Color = {
  id: number;
  nombre: string;
  codigo: number;
  hex: string
}

export enum PedidoEstado {
  Pedido = 1,
  Procesado = 2,
  Entregado = 3,
  Cancelado = 4,
}

export enum TipoEntrega {
  Rollo = 1,
  RolloApresto = 2,
  Cortada = 3,
  CortadaApresto = 4,
  CortadaDobladaMedio = 5,
  CortadaDobladaPuntas = 6,
}

export type Pedido = {
  id: number;
  user_id: number;
  diseño_id: Pick<Diseño, "id">;
  descripcion: string;
  precio: number;
  cantidad: number;

  estado: PedidoEstado;
  tipo_entrega: TipoEntrega;

  fecha_pedido: string;
  fecha_prevista: string;
  fecha_entrega: string | null;
  deleted_at: string | null;
}