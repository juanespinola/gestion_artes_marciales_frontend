import { APP_ROUTES } from '../../../../routes';
import { NavItem } from './nav-item/nav-item';
const admin_path = 'admin/';
export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Permisos',
    iconName: 'chart-pie',
    route: admin_path+APP_ROUTES.PERMISSION,
    permission: 'permission.access'
  },
  {
    displayName: 'Roles',
    iconName: 'coffee',
    route: admin_path+APP_ROUTES.ROL,
    permission: 'rol.access'
  },
  {
    displayName: 'Usuarios',
    iconName: 'cpu',
    route: admin_path+APP_ROUTES.USERS,
    permission: 'user.access'
  },
  {
    displayName: 'Federaciones',
    iconName: 'aperture',
    route: admin_path+APP_ROUTES.FEDERATION,
    permission: 'federation.access'
  },
  {
    displayName: 'Asociaciones',
    iconName: 'aperture',
    route: admin_path+APP_ROUTES.ASSOCIATION,
    permission: 'association.access'
  },
  {
    displayName: 'Eventos',
    iconName: 'aperture',
    route: admin_path+APP_ROUTES.EVENT,
    permission: 'event.access'
  },
  {
    displayName: 'Lugares',
    iconName: 'aperture',
    route: admin_path+APP_ROUTES.LOCATION,
    permission: 'place.access'
  },
  {
    displayName: 'Tipos de Eventos',
    iconName: 'aperture',
    route: admin_path+APP_ROUTES.TYPE_EVENT,
    permission: 'typesevent.access'
  },
  {
    displayName: 'Estados de Eventos',
    iconName: 'aperture',
    route: admin_path+APP_ROUTES.STATUS_EVENT,
    permission: 'statusevent.access'
  },
  {
    displayName: 'Noticias',
    iconName: 'aperture',
    route: admin_path+APP_ROUTES.NEW,
    permission: 'new.access'
  },
  {
    displayName: 'Solicitudes',
    iconName: 'aperture',
    route: admin_path+APP_ROUTES.REQUEST,
    permission: 'request.access'
  },
  {
    displayName: 'Atletas',
    iconName: 'aperture',
    route: admin_path+APP_ROUTES.ATHLETES,
    // permission: 'request.access'
  },
  {
    displayName: 'Autorización de Menores',
    iconName: 'aperture',
    route: admin_path+APP_ROUTES.MINOR_AUTHORIZATION,
    // permission: 'request.access'
  },
];
