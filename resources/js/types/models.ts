export type Precio = {
  id: number;
  medida: number // 12 | 14 | 16 | 20 | 22 | 25 mm
  cantidad_colores: 1 | 2 | 3 | 4 | 5 | 6 | 7
  precio: number
  tipo_etiqueta_id: number
  fecha_desde: string
  fecha_hasta: string | null
}

export type PrecioWithTipoEtiqueta = Precio & {
  tipo_etiqueta: Pick<TipoEtiqueta, "id"| "nombre"> 
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