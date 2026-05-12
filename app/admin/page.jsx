"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // State untuk Form Tambah Data
  const [form, setForm] = useState({ nama: '', alamat: '', jenis: '', lat: '', lng: '' });

  useEffect(() => {
    cekSesi();
    ambilData();
  }, []);

  // 1. Cek apakah user sudah login
  const cekSesi = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login'); // Tendang ke halaman login jika belum masuk
    }
  };

  // 2. Ambil data dari database (Read)
  const ambilData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('bank_sampah').select('*').order('id', { ascending: false });
    if (!error) setData(data);
    setLoading(false);
  };

  // 3. Tambah Data (Create)
  const handleTambah = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('bank_sampah').insert([
      { 
        nama: form.nama, 
        alamat: form.alamat, 
        jenis: form.jenis, 
        lat: parseFloat(form.lat), 
        lng: parseFloat(form.lng) 
      }
    ]);

    if (!error) {
      alert("Data berhasil ditambahkan!");
      setForm({ nama: '', alamat: '', jenis: '', lat: '', lng: '' }); // Kosongkan form
      ambilData(); // Refresh tabel
    } else {
      alert("Gagal menambahkan data: " + error.message);
    }
  };

  // 4. Hapus Data (Delete)
  const handleHapus = async (id) => {
    if(confirm("Yakin ingin menghapus titik ini?")) {
      const { error } = await supabase.from('bank_sampah').delete().eq('id', id);
      if (!error) {
        ambilData(); // Refresh tabel
      } else {
        alert("Gagal menghapus data.");
      }
    }
  };

  // 5. Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Admin */}
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-green-900">Dashboard Admin KARSA</h1>
          <div className="flex gap-4">
            <a href="/" target="_blank" className="text-green-700 font-bold hover:underline py-2">Lihat Web</a>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Kolom Kiri: Form Tambah Data */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h2 className="font-bold text-lg mb-4 border-b pb-2">Tambah Titik Baru</h2>
            <form onSubmit={handleTambah} className="flex flex-col gap-3">
              <input type="text" placeholder="Nama Tempat" required className="border p-2 rounded text-sm" value={form.nama} onChange={(e) => setForm({...form, nama: e.target.value})} />
              <input type="text" placeholder="Alamat Detail" required className="border p-2 rounded text-sm" value={form.alamat} onChange={(e) => setForm({...form, alamat: e.target.value})} />
              <input type="text" placeholder="Jenis (Contoh: Tempat Sampah)" required className="border p-2 rounded text-sm" value={form.jenis} onChange={(e) => setForm({...form, jenis: e.target.value})} />
              <div className="grid grid-cols-2 gap-2">
                <input type="number" step="any" placeholder="Latitude (-7.xxx)" required className="border p-2 rounded text-sm" value={form.lat} onChange={(e) => setForm({...form, lat: e.target.value})} />
                <input type="number" step="any" placeholder="Longitude (110.xxx)" required className="border p-2 rounded text-sm" value={form.lng} onChange={(e) => setForm({...form, lng: e.target.value})} />
              </div>
              <button type="submit" className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 mt-2">Simpan Data</button>
            </form>
          </div>

          {/* Kolom Kanan: Tabel Data */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
            <h2 className="font-bold text-lg mb-4 border-b pb-2">Daftar Titik Tersimpan</h2>
            {loading ? <p>Memuat data...</p> : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 border">Nama</th>
                    <th className="p-3 border">Jenis</th>
                    <th className="p-3 border">Koordinat</th>
                    <th className="p-3 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-3 border font-semibold">{item.nama}</td>
                      <td className="p-3 border">{item.jenis}</td>
                      <td className="p-3 border text-gray-500 text-xs">{item.lat}, {item.lng}</td>
                      <td className="p-3 border">
                        <button onClick={() => handleHapus(item.id)} className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 font-bold">Hapus</button>
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && <tr><td colSpan="4" className="text-center p-4">Belum ada data</td></tr>}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}