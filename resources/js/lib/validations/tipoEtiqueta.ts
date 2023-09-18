import { z } from "zod";

export const tipoEtiquetaSchema = z.object({
  nombre: z.string({
    required_error: "Ingrese el nombre de la etiqueta",
    invalid_type_error: "Ingrese el nombre de la etiqueta"
  })
    .min(3, "Ingrese el nombre de la etiqueta"),
});

export type TipoEtiquetaFormSchema = z.infer<typeof tipoEtiquetaSchema>