import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { usuarioService } from '@/src/service/usuarioService';
import { Usuario } from '@/src/interfaces/Usuario';
import { Jugador } from '@/src/interfaces/Jugador';
import { useAuth } from '@/src/contexts/AuthContext'; // Importa el AuthContext para obtener el ID del usuario actual

interface UserContextProps {
  usuario: Usuario | null;
  loading: boolean;
  fetchUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuth(); // Obtén el usuario autenticado del AuthContext

  const fetchUserData = useCallback(async () => {
    if (!authUser) {
      setUsuario(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { error, mensaje, usuario } = await usuarioService.getUser(
        authUser.id
      );
      if (error) {
        console.error(mensaje);
      }
      setUsuario(usuario);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  useEffect(() => {
    fetchUserData();
  }, [authUser, fetchUserData]);

  return (
    <UserContext.Provider value={{ usuario, loading, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe usarse dentro de UserProvider');
  }
  return context;
};
