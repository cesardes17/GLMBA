import { Drawer } from "expo-router/drawer";
import { useAuth } from "../../hooks/useAuth";

export default function DrawerLinks() {
  const { user } = useAuth();

  return (
    <>
      {/* 🔹 Enlaces solo para usuarios NO autenticados */}
      {!user && (
        <>
          <Drawer.Screen
            name="login"
            options={{ drawerLabel: "Iniciar Sesión", title: "Login" }}
          />
          <Drawer.Screen
            name="register"
            options={{ drawerLabel: "Registrarse", title: "Registro" }}
          />
        </>
      )}

      {/* 🔹 Enlaces para usuarios autenticados */}
      {user && (
        <Drawer.Screen
          name="profile"
          options={{ drawerLabel: "Perfil", title: "Perfil" }}
        />
      )}
    </>
  );
}
