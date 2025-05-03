import { Usuario } from '@/src/interfaces/Usuario';

import UsuarioCard from './UsuarioCard';
import JugadorCard from './JugadorCard';
import { JugadorConEquipo } from '@/src/interfaces/vistas/JugadorConEquipo';

interface PerfilCardProps {
  usuario: Usuario;
  jugadorExtendido?: JugadorConEquipo | null;
}

export default function PerfilCard({
  usuario,
  jugadorExtendido,
}: PerfilCardProps) {
  if (usuario.rol_id === 5 && jugadorExtendido) {
    return <JugadorCard jugador={jugadorExtendido} />;
  }
  return <UsuarioCard usuario={usuario} />;
}
