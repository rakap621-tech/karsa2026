"use client"; // Ini menandakan file ini adalah Client Component

import dynamic from 'next/dynamic';

// Kita pindahkan pemanggilan peta Leaflet yang butuh ssr: false ke sini
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">Memuat Peta...</div>
});

export default function MapWrapper({ dataLokasi }) {
  return <MapComponent dataLokasi={dataLokasi} />;
}