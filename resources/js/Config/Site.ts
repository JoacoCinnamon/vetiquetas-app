export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  active?: boolean
  isPrivate?: boolean
  external?: boolean
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

interface VetiquetasConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const vetiquetasConfig: VetiquetasConfig = {
  mainNav: [
    {
      title: "Inicio",
      href: "/",
    },
    {
      title: "Cotizar",
      href: "/cotizar",
    },
    {
      title: "Etiquetas",
      href: route("administracion.etiquetas.index"),
      isPrivate: true
    },
    {
      title: "Precios",
      href: route("administracion.precios.index"),
      isPrivate: true
    },
  ],
  sidebarNav: [
    {
      title: "Inicio",
      href: "/",
      items: []
    },
    {
      title: "Cotizar",
      href: "/cotizar",
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
      ],
    },
  ],
} 