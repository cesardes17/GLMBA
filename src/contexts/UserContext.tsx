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
  usuario: Usuario | Jugador | null;
  loading: boolean;
  fetchUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | Jugador | null>(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuth(); // Obtén el usuario autenticado del AuthContext

  const fetchUserData = useCallback(async () => {
    if (!authUser) return;
    setLoading(true);
    try {
      console.log('E', authUser.id);
      const { error, mensaje, usuario } = await usuarioService.getUser(
        authUser.id
      );
      if (error) {
        console.error(mensaje);
      }
      setUsuario(usuario);
    } catch (error) {
      console.error('Error fetching user data:', error);
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
