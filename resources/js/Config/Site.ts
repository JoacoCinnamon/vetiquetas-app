export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  active?: boolean
  isProtected?: boolean
  isPrivate?: boolean
  external?: boolean
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {
  isActive: () => boolean
}

export interface SidebarNavItem extends NavItemWithChildren { }

interface VetiquetasConfig {
  name: string
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const vetiquetasConfig: VetiquetasConfig = {
  name: "Vetiquetas",
  mainNav: [
    {
      title: "Cotizar",
      href: route("cotizar"),
      isActive: () => {
        return route().current("cotizar");
      }
    },
    {
      title: "Inicio",
      href: route("administracion.dashboard"),
      isPrivate: true,
      isActive: () => {
        return route().current("administracion.dashboard");
      },
    },
    {
      title: "Mis diseños",
      href: route("disenios.index"),
      isProtected: true,
      isActive: () => {
        return route().current("disenios.index");
      },
    },
    {
      title: "Pedidos",
      href: route("pedidos.index"),
      isProtected: true,
      isActive: () => {
        return route().current("pedidos.index");
      },
    },
    {
      title: "Etiquetas",
      href: route("administracion.etiquetas.index"),
      isPrivate: true,
      isActive: () => {
        return route().current("administracion.etiquetas.index");
      },
    },
    {
      title: "Precios",
      href: route("administracion.precios.index"),
      isPrivate: true,
      isActive: () => {
        return route().current("administracion.precios.index");
      }
    },
    {
      title: "Colores",
      href: route("administracion.colores.index"),
      isPrivate: true,
      isActive: () => {
        return route().current("administracion.colores.index");
      }
    },
  ],
  sidebarNav: [
    {
      title: "Cotizar",
      href: route("cotizar"),
      items: []
    },
    {
      title: "Inicio",
      href: route("administracion.dashboard"),
      isProtected: true,
      items: []
    },
    {
      title: "Mis diseños",
      href: route("disenios.index"),
      isProtected: true,
      items: []
    },
    {
      title: "Pedidos",
      href: route("pedidos.index"),
      isProtected: true,
      items: []
    },
    {
      title: "Administración",
      isPrivate: true,
      items: [
        {
          title: "Etiquetas",
          href: route("administracion.etiquetas.index"),
          isPrivate: true,
          items: []
        },
        {
          title: "Precios",
          href: route("administracion.precios.index"),
          isPrivate: true,
          items: []
        },
        {
          title: "Colores",
          href: route("administracion.colores.index"),
          isPrivate: true,
          items: []
        },
      ],
    },
  ],
} 