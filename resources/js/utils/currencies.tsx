export function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(precio)
}