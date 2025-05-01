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
    allowedRoles: ['JUGADOR', 'CAPITAN', 'ORGANIZADOR', 'COORGANIZADOR'], // solo jugadores y capitanes
  },
  {
    id: 'panelControl',
    title: 'Panel de Control',
    description: 'Gestiona la Liga Municipal de Baloncesto.',
    path: '/panelControl',
    allowedRoles: ['ORGANIZADOR', 'COORGANIZADOR'], // solo organizadores y coorganizadores
  },
];
