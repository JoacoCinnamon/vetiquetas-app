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
export const CANTIDAD_COLORES = [1, 2, 3, 4, 5, 6, 7] as const;


export type Diseño = {
  id: number;
  user_id: number;
  tipo_etiqueta_id: Pick<TipoEtiqueta, "id">
  nombre: string;
  colores: { id: number, nombre: string, hex: `#${string}` }[];
  ancho: typeof MEDIDAS[number];
  largo: number;
  foto_path: string;
  creado_el: string
  actualizado_el: string;
  // Colores
}

export type Color = {
  id: number;
  nombre: string;
  hex: string
}