import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Permisos',
    iconName: 'chart-pie',
    route: '/permission',
    permission: 'permission.access'
  },
  {
    displayName: 'Roles',
    iconName: 'coffee',
    route: '/rol',
    permission: 'rol.access'
  },
  {
    displayName: 'Usuarios',
    iconName: 'cpu',
    route: '/users',
    permission: 'user.access'
  },
  {
    displayName: 'Categorias',
    iconName: 'shopping-cart',
    route: '/category',
    permission: 'category.access'
  },
  {
    displayName: 'Reglas Categorias',
    iconName: 'aperture',
    route: '/groupcategory',
    permission: 'groupcategory.access'
  },
  
];
