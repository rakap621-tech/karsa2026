"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Perbaikan bug ikon Leaflet yang sering tidak muncul di Next.js/React
const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapComponent({ dataLokasi }) {
  // Koordinat pusat peta (Sendowo/UGM)
  const posisiPusat = [-7.7685, 110.3731];

  return (
    <MapContainer 
      center={posisiPusat} 
      zoom={16} 
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Bagian utama: Menampilkan titik dari database */}
      {dataLokasi && dataLokasi.map((titik) => (
        <Marker 
          key={titik.id} 
          position={[titik.lat, titik.lng]} 
          icon={customIcon}
        >
          <Popup>
            <div className="font-sans min-w-[200px]">
              <h3 className="font-bold text-green-900 text-lg mb-1">{titik.nama}</h3>
              <p className="text-gray-600 text-sm mb-2">{titik.alamat}</p>
              
              {/* BAGIAN YANG DIUBAH: Baris "Jam" sudah dihapus */}
              <div className="bg-green-50 p-2 rounded-lg text-xs space-y-1 border border-green-100">
                <p><strong>♻️ Jenis:</strong> {titik.jenis}</p>
              </div>
              
              <button 
                onClick={() => window.open(`https://maps.google.com/?q=${titik.lat},${titik.lng}`)}
                className="w-full mt-3 bg-green-600 text-white py-1.5 rounded-full text-xs font-bold hover:bg-green-700 transition"
              >
                Rute Sekarang
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}