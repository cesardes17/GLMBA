// /app/(tabs)/profile.js
import React from "react";
import { useAuth } from "../../src/hooks/useAuth";
import ProfileScreen from "../../src/screens/ProfileScreen";
import LoginScreen from "../../src/screens/LoginScreen";

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) {
    return <LoginScreen />;
  }

  return <ProfileScreen />;
}
