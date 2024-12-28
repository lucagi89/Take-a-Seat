'use client';
// import { useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { useRouter } from "next/navigation";
import MapComponent from "./components/map-component/MapComponent";
import Footer from './components/Footer'

export default function Home() {
  // const router = useRouter();
  // const { user, loading } = useAuth();

  // useEffect(() => {
  //   if (!loading && !user) {
  //     console.log("No user, redirecting to login...");
  //     router.push("/login");
  //   }
  // }, [loading, user, router]);

  // if (loading) {
  //   return <p>Loading...</p>; // Show a loading indicator while auth state is being resolved
  // }


  return (
    <div style={{height: '100vh'}}>
        <MapComponent />
        <Footer/>
    </div>
  );

}
