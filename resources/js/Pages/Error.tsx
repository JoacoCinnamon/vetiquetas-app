export default function ErrorPage({ status }: { status: number }) {
  const title = {
    503: '503 - Servicio no disponible',
    500: '500 - Error del servidor',
    404: '404 - Página no encontrada',
    403: '403 - Prohibido',
  }[status]

  const description = {
    503: 'Disculpa, estamos realizando tareas de mantenimiento. Por favor, vuelve a verificar pronto.',
    500: '¡Ups! Algo salió mal en nuestros servidores.',
    404: 'Disculpa, la página que estás buscando no pudo ser encontrada.',
    403: 'Lo siento, no tienes permitido acceder a esta página.'
  }[status]

  return (
    <div>
      <h1>{title}</h1>
      <div>{description}</div>
    </div>
  )
}