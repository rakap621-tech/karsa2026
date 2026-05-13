import { supabase } from '../lib/supabase';
import MapWrapper from '../components/MapWrapper';

// Fungsi untuk mengambil data titik bank sampah dari Supabase
async function getBankSampah() {
  try {
    const { data, error } = await supabase.from('bank_sampah').select('*');
    if (error) {
      throw error;
    }
    if (!data || data.length === 0) throw new Error("Data kosong atau terhalang RLS"); 
    return data;
  } catch (err) {
    // INI BARIS DEBUG UNTUK MELIHAT MASALAH ASLINYA DI TERMINAL
    console.error("DEBUG ERROR SUPABASE:", err); 
    
    // DATA CADANGAN: Agar peta tetap tampil jika database belum siap
    return [
      {
        id: 1,
        nama: "Bank Sampah Kos Mentari (Contoh)",
        alamat: "Jl. Sendowo Baru Gg. I",
        jam: "Sabtu & Minggu, 10:00 - 14:00",
        jenis: "Plastik, Kertas, Logam",
        lat: -7.7685,
        lng: 110.3731
      }
    ];
  }
}

export default async function Home() {
  const dataBankSampah = await getBankSampah();

  return (
    <main className="min-h-screen bg-white font-sans">
      
      {/* 1. NAVBAR (Navigasi Atas) */}
      <nav className="absolute w-full top-0 z-50 py-6 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-white">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <img 
            src="/logo-karsa.png" 
            alt="Logo KARSA" 
            className="w-12 h-12 object-contain" 
          />
          <span className="text-xl font-bold tracking-wide">KARSA</span>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 text-xs md:text-sm font-medium tracking-widest uppercase">
          <a href="#" className="hover:text-green-300 transition">Beranda</a>
          <span className="text-white/30 hidden md:inline">|</span>
          <a href="#video" className="hover:text-green-300 transition">Video Sosialisasi</a>
          <span className="text-white/30 hidden md:inline">|</span>
          <a href="#peta" className="hover:text-green-300 transition">Peta Bank Sampah</a>
          <span className="text-white/30 hidden md:inline">|</span>
          <a href="#" className="hover:text-green-300 transition">Dokumentasi</a>
          <span className="text-white/30 hidden md:inline">|</span>
          <a href="#" className="hover:text-green-300 transition">Hubungi Kami</a>
          
          {/* TOMBOL LOGIN ADMIN (Baru Ditambahkan) */}
          <a 
            href="/login" 
            className="ml-0 md:ml-4 bg-white/10 hover:bg-white/30 border border-white/40 px-5 py-2.5 rounded-full transition-all backdrop-blur-sm"
          >
            Login Admin
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION (Latar Belakang Foto) */}
      <section 
        className="relative pt-48 pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden min-h-[80vh]"
        style={{ 
          // Pastikan gambar dengan nama hero-karsa.png atau hero-karsa.jpg ada di folder public
          backgroundImage: "url('/hero-karsa.png')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay Gelap: Agar teks putih kontras dan mudah dibaca */}
        <div className="absolute inset-0 bg-green-950/60 mix-blend-multiply"></div>
        
        {/* Gradasi Halus di bagian bawah agar transisinya cantik */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            Program Bank Sampah KARSA
          </h1>
          <p className="text-white/95 text-lg md:text-xl mb-20 max-w-2xl font-light drop-shadow-lg">
            Pilah Sampahmu, Selamatkan Lingkunganmu!<br className="hidden md:block"/>
          </p>
          <a 
            href="#video" 
            className="bg-white text-green-900 px-10 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-green-50 hover:scale-105 transition-all shadow-2xl uppercase"
          >
            Mulai Sekarang
          </a>
        </div>
      </section>

      {/* BAGIAN VIDEO SOSIALISASI */}
      <section id="video" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            Mengenal Program KARSA
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Saksikan video sosialisasi berikut untuk memahami bagaimana langkah kecil kita bisa membawa perubahan besar bagi lingkungan.
          </p>

          {/* Kotak Video Responsif (Bagus di HP & Laptop) */}
          <div className="relative w-full overflow-hidden rounded-2xl shadow-xl aspect-video bg-black">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/Z26sH2S-g6c?si=MovvFFcK3IMN8tDr" 
              title="Video Sosialisasi KARSA" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>

        </div>
      </section>

      {/* 4. PETA BANK SAMPAH SECTION */}
      <section id="peta" className="py-12 px-6 md:px-12 max-w-7xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 border-l-4 border-green-600 pl-4">Peta Bank Sampah</h2>
        
        {/* Frame Peta agar terlihat mewah */}
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 ring-1 ring-black/5">
          <MapWrapper dataLokasi={dataBankSampah} />
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-green-950 text-white py-16 flex flex-col items-center justify-center text-center">
        <img 
          src="/logo-karsa.png" 
          alt="Logo KARSA Footer" 
          className="w-14 h-14 object-contain mb-6 opacity-90" 
        />
        <div className="flex gap-6 mb-6 text-sm text-green-200/60">
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">YouTube</a>
          <a href="#" className="hover:text-white transition">Email</a>
        </div>
        <p className="text-xs font-light text-green-200/40 tracking-[0.2em] uppercase">
          © KARSA Project 2026 • Sendowo, Yogyakarta
        </p>
      </footer>

    </main>
  );
}