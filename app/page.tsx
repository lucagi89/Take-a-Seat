'use client';
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import MapComponent from "./components/map-component/MapComponent";
import Footer from './components/Footer'

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  return (
    <div style={{height: '100vh'}}>
        <MapComponent />
        <Footer />
    </div>
  );
}
