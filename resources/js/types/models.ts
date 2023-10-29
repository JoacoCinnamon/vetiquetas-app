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

export const PEDIDOS_ESTADOS = {
  1: { id: 1, label: "Pedido" },
  2: { id: 2, label: "Procesado" },
  3: { id: 3, label: "Entregado" },
  4: { id: 4, label: "Cancelado" },
} as const

export function getPedidoEstado(estado: PedidoEstado) {
  return PEDIDOS_ESTADOS[estado];
}

export enum TipoEntrega {
  Rollo = "1",
  RolloApresto = "2",
  Cortada = "3",
  CortadaApresto = "4",
  CortadaDobladaMedio = "5",
  CortadaDobladaPuntas = "6",
}

export const TIPOS_ENTREGAS: Record<"rollo" | "rollo_apresto" | "cortada" | "cortada_apresto" | "cortada_doblada_medio" | "cortada_doblada_puntas", { incrementa: number, label: string, value: string }> = {
  rollo: { incrementa: 1, label: "En rollo", value: TipoEntrega.Rollo },
  rollo_apresto: { incrementa: 1.10, label: "En rollo + apresto (+10%)", value: TipoEntrega.RolloApresto },
  cortada: { incrementa: 1.15, label: "Cortada (+15%)", value: TipoEntrega.Cortada },
  cortada_apresto: { incrementa: 1.2, label: "Cortada + apresto (+20%)", value: TipoEntrega.CortadaApresto },
  cortada_doblada_medio: { incrementa: 1.25, label: "Cortada y doblada al medio (+25%)", value: TipoEntrega.CortadaDobladaMedio },
  cortada_doblada_puntas: { incrementa: 1.25, label: "Cortada y doblada en las puntas (+25%)", value: TipoEntrega.CortadaDobladaPuntas },
} as const

export function getTipoEntrega(tipoEntrega: TipoEntrega) {
  switch (tipoEntrega) {
    case TipoEntrega.Rollo:
      return TIPOS_ENTREGAS.rollo;
    case TipoEntrega.RolloApresto:
      return TIPOS_ENTREGAS.rollo_apresto;
    case TipoEntrega.Cortada:
      return TIPOS_ENTREGAS.cortada;
    case TipoEntrega.CortadaApresto:
      return TIPOS_ENTREGAS.cortada_apresto;
    case TipoEntrega.CortadaDobladaMedio:
      return TIPOS_ENTREGAS.cortada_doblada_medio;
    case TipoEntrega.CortadaDobladaPuntas:
      return TIPOS_ENTREGAS.cortada_doblada_puntas;
    default:
      return TIPOS_ENTREGAS.rollo;
  }
}

export type Pedido = {
  id: number;
  user_id: number;

  diseño_id: Pick<Diseño, "id">;
  diseño: Diseño

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