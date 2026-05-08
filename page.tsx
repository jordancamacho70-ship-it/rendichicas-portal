"use client";
import React, { useState } from 'react';
import { 
  Search, Download, LayoutDashboard, Lock, 
  ShieldCheck, Zap, ExternalLink 
} from 'lucide-react';

export default function RendichicasPortalPro() {
  const [autorizado, setAutorizado] = useState(false);
  const [password, setPassword] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const CLAVE_ACCESO = "rendichicas2026"; 

  // Datos basados en tu Excel y estructura de carpetas
  const manuales = [
    { id: 1, codigo: "MOP-EST-VEN-001-R01", titulo: "Conociendo tu Estación", cat: "Ventas", link: "/docs/Conociendo tu estación.pdf" },
    { id: 2, codigo: "MOP-EST-VEN-002-R01", titulo: "Uso del Dispensario", cat: "Ventas", link: "/docs/MOP-EST-VEN-002-R01.pdf" },
    { id: 5, codigo: "MOP-EST-VEN-005-R01", titulo: "Servicio al Cliente", cat: "Ventas", link: "/docs/Manual servicio al cliente.pdf" },
    { id: 7, codigo: "MOP-EST-GER-001-R01", titulo: "Conociendo tu Estación (Gerencia)", cat: "Gerencia", link: "/docs/MOP-EST-GER-001-R01.pdf" },
    { id: 8, codigo: "MOP-EST-GER-002-R01", titulo: "Inicio de Turno", cat: "Gerencia", link: "/docs/MOP-EST-GER-002-R01.pdf" },
    { id: 9, codigo: "MOP-EST-GER-003-R01", titulo: "Liquidación de Turno", cat: "Gerencia", link: "/docs/MOP-EST-GER-003-R01.pdf" }
  ];

  const categorias = ["Todos", "Ventas", "Gerencia"];

  const filtrados = manuales.filter(m => {
    const cumpleBusqueda = m.titulo.toLowerCase().includes(busqueda.toLowerCase()) || m.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleCategoria = categoriaActiva === "Todos" || m.cat === categoriaActiva;
    return cumpleBusqueda && cumpleCategoria;
  });

  const manejarLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CLAVE_ACCESO) setAutorizado(true);
    else alert("Clave incorrecta");
  };

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E6007E] to-[#b30062] flex items-center justify-center p-6 text-gray-800">
        <div className="bg-white/95 backdrop-blur-sm p-10 rounded-[3rem] shadow-2xl w-full max-w-md text-center">
          <img src="/mascota.jpg" className="w-28 h-28 rounded-full border-4 border-pink-100 shadow-xl object-cover mx-auto mb-6" alt="Mascota" />
          <h1 className="text-3xl font-black mb-8 text-gray-900 tracking-tight">Acceso Estaciones</h1>
          <form onSubmit={manejarLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Clave Genérica"
              className="w-full px-6 py-4 bg-gray-100 rounded-2xl outline-none focus:ring-4 ring-pink-200 text-center text-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-[#E6007E] text-white py-4 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all">ENTRAR</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Barra Lateral */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen shadow-sm">
        <div className="p-8 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <img src="/mascota.jpg" className="w-12 h-12 rounded-2xl object-cover shadow-md" alt="Logo" />
            <div>
              <p className="font-black text-xl tracking-tighter text-[#E6007E]">RENDI</p>
              <p className="text-[10px] font-bold text-gray-400 -mt-1 uppercase tracking-widest">Portal Digital</p>
            </div>
          </div>
        </div>
        <nav className="p-6 space-y-2 flex-1">
          {categorias.map(cat => (
            <button 
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${categoriaActiva === cat ? 'bg-pink-50 text-[#E6007E]' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
            >
              {cat === "Todos" ? <LayoutDashboard size={20}/> : cat === "Ventas" ? <Zap size={20}/> : <ShieldCheck size={20}/>}
              {cat}
            </button>
          ))}
        </nav>
        <div className="p-8 border-t border-gray-50">
          <button onClick={() => setAutorizado(false)} className="w-full text-xs font-black text-gray-300 hover:text-red-400 uppercase">Cerrar Sesión</button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-12">
        <header className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Biblioteca de Procesos</h1>
            <p className="text-gray-400 font-medium">{filtrados.length} manuales oficiales disponibles</p>
          </div>
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar manual..." 
              className="pl-14 pr-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 outline-none focus:ring-4 ring-pink-50 w-full md:w-96 text-sm"
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((manual) => (
            <div key={manual.id} className="bg-white p-2 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col group">
              <div className="p-6 pb-2">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-gray-50 px-3 py-1 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">{manual.cat}</div>
                </div>
                <h3 className="text-gray-400 text-[11px] font-black tracking-widest mb-1 uppercase">{manual.codigo}</h3>
                <p className="text-gray-900 font-bold text-lg leading-tight group-hover:text-[#E6007E] transition-colors">{manual.titulo}</p>
              </div>
              <div className="p-4 mt-auto">
                <a href={manual.link} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-[1.5rem] font-black text-xs hover:bg-[#E6007E] transition-all shadow-lg active:scale-95">
                  <ExternalLink size={16} /> ABRIR MANUAL
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
