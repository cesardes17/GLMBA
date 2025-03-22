import { useRouter, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function LoginRedirect() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // Ensure this runs after component mounts
    router.replace("/login");
  }, [router]);

  return null; // Return null to avoid any flash of content
}