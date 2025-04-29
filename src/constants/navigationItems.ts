// src/constants/navigationItems.ts

import { RolKey } from './roles';

export type NavigationAllowedRole = '*' | 'auth' | RolKey;

export interface NavigationItem {
  id: string;
  title: string;
  description: string;
  path: string;
  allowedRoles: NavigationAllowedRole[];
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'ajustes',
    title: 'Ajustes',
    description: 'Configura tu experiencia en la aplicación.',
    path: '/ajustes',
    allowedRoles: ['*'], // cualquier usuario, incluso invitado
  },
  {
    id: 'solicitudes',
    title: 'Solicitudes',
    description: 'Gestiona tus solicitudes de unión a equipos.',
    path: '/solicitudes',
    allowedRoles: ['JUGADOR', 'CAPITAN'], // solo jugadores y capitanes
  },
];
