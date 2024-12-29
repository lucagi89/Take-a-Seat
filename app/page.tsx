'use client';
// import { useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { useRouter } from "next/navigation";
import MapComponent from "./components/map-component/MapComponent";
import Footer from './components/Footer'
import withAuth from './hoc/withAuth';

function Home() {

  return (
    <div style={{height: '100vh'}}>
        <MapComponent />
        <Footer/>
    </div>
  );

}

export default withAuth(Home);
