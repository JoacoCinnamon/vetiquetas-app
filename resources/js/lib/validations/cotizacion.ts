import { CANTIDAD_COLORES, MEDIDAS } from "@/types/models";
import { z } from "zod";

export const TIPO_ENTREGA_VALUES = [
  "rollo",
  "rollo_apresto",
  "cortada",
  "cortada_apresto",
  "cortada_doblada_medio",
  "cortada_doblada_puntas",
] as const;
export type TipoEntrega = typeof TIPO_ENTREGA_VALUES[number];
export const tipoEntregaForm: Record<TipoEntrega, { incrementa: number, label: string }> = {
  rollo: { incrementa: 1, label: "En rollo" },
  rollo_apresto: { incrementa: 1.10, label: "En rollo + apresto (+10%)" },
  cortada: { incrementa: 1.15, label: "Cortada (+15%)" },
  cortada_apresto: { incrementa: 1.2, label: "Cortada + apresto (+20%)" },
  cortada_doblada_medio: { incrementa: 1.25, label: "Cortada y doblada al medio (+25%)" },
  cortada_doblada_puntas: { incrementa: 1.25, label: "Cortada y doblada en las puntas (+25%)" },
} as const

export const cotizacionFormSchema = z.object({
  tipoEtiquetaId: z.coerce.number({ required_error: "Ingrese el tipo de etiqueta." })
    .min(1, { message: "Ingrese el tipo de etiqueta." }),
  cantidadColores: z.coerce.number({ required_error: "Ingrese la cantidad de colores." })
    .min(CANTIDAD_COLORES[0], { message: "Ingrese la cantidad de colores." })
    .max(CANTIDAD_COLORES[CANTIDAD_COLORES.length - 1], { message: "Ingrese la cantidad de colores." }),
  ancho: z.coerce.number({ required_error: "Ingrese el ancho." })
    .min(MEDIDAS[0], { message: "Ingrese el ancho." })
    .max(MEDIDAS[MEDIDAS.length - 1], { message: "Ingrese el ancho." }),
  largo: z.coerce.number({ invalid_type_error: "Ingrese un número.", required_error: "Ingrese el largo." })
    .min(40, { message: "El mínimo de largo son 2mm.", })
    .max(300, { message: "El máximo de largo son 300mm." }),
  tipoEntrega: z.enum(TIPO_ENTREGA_VALUES, {
    required_error: "Elija un tipo de entrega.",
    invalid_type_error: "Elija un tipo de entrega.",
  }),
  cantidadUnidades: z.coerce.number({ invalid_type_error: "Ingrese un número.", required_error: "Ingrese la cantidad de unidades." })
    .min(1500, { message: "El mínimo de cantidad de unidades son 1500.", })
});

export type CotizacionFormSchema = z.infer<typeof cotizacionFormSchema>