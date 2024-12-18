// 'use client';
import MapComponent from "./components/map-component/MapComponent";
import Footer from './components/Footer'

export default function Home() {
  return (
    <div style={{height: '100vh'}}>
        <MapComponent />
        <Footer />
    </div>
  );
}
