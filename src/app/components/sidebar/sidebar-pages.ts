import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Permisos',
    iconName: 'chart-pie',
    route: '/permission',
  },
  {
    displayName: 'Roles',
    iconName: 'coffee',
    route: '/rol',
  },
  {
    displayName: 'Usuarios',
    iconName: 'cpu',
    route: '/users',
  },
  {
    displayName: 'Deportes',
    iconName: 'flag',
    route: '/sport',
  },
  {
    displayName: 'Categorias',
    iconName: 'shopping-cart',
    route: '/category',
  },
  {
    displayName: 'Reglas Categorias',
    iconName: 'aperture',
    route: '/groupcategory',
  },
  
];
