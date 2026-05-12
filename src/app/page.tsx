'use client';
import './globals.css';
import React, { useState } from 'react';
import { 
  Search, LayoutDashboard, ShieldCheck, Zap, ExternalLink, Menu, X, ChevronRight, User
} from 'lucide-react';

export default function RendichicasPortalDynamic() {
  const [autorizado, setAutorizado] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [rolUsuario, setRolUsuario] = useState(""); 

  // CONFIGURACIÓN DE USUARIOS Y CONTRASEÑAS
  const usuariosValidos = [
    { user: "ventas.estacion", pass: "vendedor2026", rol: "VENDEDOR" },
    { user: "gerente.estacion", pass: "gerente2026", rol: "GERENTE/SUPERVISOR" }
  ];

  const manuales = [
    { id: 1, codigo: "MOP-EST-VEN-001-R01", titulo: "Conociendo tu Estación", cat: "Ventas", link: "/docs/Conociendo tu estación.pdf" },
    { id: 2, codigo: "MOP-EST-VEN-002-R01", titulo: "Uso del Dispensario", cat: "Ventas", link: "/docs/MOP-EST-VEN-002-R01.pdf" },
    { id: 5, codigo: "MOP-EST-VEN-005-R01", titulo: "Servicio al Cliente", cat: "Ventas", link: "/docs/Manual servicio al cliente.pdf" },
    { id: 7, codigo: "MOP-EST-GER-001-R01", titulo: "Conociendo tu Estación (Gerencia)", cat: "Gerencia", link: "/docs/MOP-EST-GER-001-R01.pdf" },
    { id: 8, codigo: "MOP-EST-GER-002-R01", titulo: "Inicio de Turno", cat: "Gerencia", link: "/docs/MOP-EST-GER-002-R01.pdf" },
    { id: 9, codigo: "MOP-EST-GER-003-R01", titulo: "Liquidación de Turno", cat: "Gerencia", link: "/docs/MOP-EST-GER-003-R01.pdf" },
    { id: 10, codigo: "MOP-COR-GEN-028-RO1", titulo: "Uso aplicativo car mobile", cat: "Ventas", link: "/docs/car-mobile.pdf" }
  ];

  const filtrados = manuales.filter(m => {
    const cumpleBusqueda = m.titulo.toLowerCase().includes(busqueda.toLowerCase()) || m.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleCategoria = categoriaActiva === "Todos" || m.cat === categoriaActiva;
    
    let cumpleRol = false;
    if (rolUsuario === "GERENTE/SUPERVISOR") cumpleRol = true; 
    if (rolUsuario === "VENDEDOR" && m.cat === "Ventas") cumpleRol = true; 

    return cumpleBusqueda && cumpleCategoria && cumpleRol;
  });

  const manejarLogin = (e: any) => {
    e.preventDefault();
    const loginExitoso = usuariosValidos.find(u => u.user === usuario && u.pass === password);
    
    if (loginExitoso) {
      setRolUsuario(loginExitoso.rol);
      setAutorizado(true);
    } else {
      alert("Usuario o contraseña incorrectos 🌱");
    }
  };

  const categorias = rolUsuario === "VENDEDOR" ? ["Ventas"] : ["Todos", "Ventas", "Gerencia"];

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-[#E6007E] flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl w-full max-w-md text-center border-t-8 border-pink-100">
          <img src="/mascota.jpg" className="w-24 h-24 rounded-full border-4 border-pink-50 shadow-lg object-cover mx-auto mb-6" alt="Mascota" />
          <h1 className="text-2xl font-black mb-1 text-gray-900 tracking-tight">Portal Estaciones</h1>
          <p className="text-gray-400 mb-8 font-bold text-sm uppercase tracking-widest">Inicio de Sesión</p>
          
          <form onSubmit={manejarLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                placeholder="Usuario"
                className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 ring-pink-100 border border-gray-100 text-lg"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
            <input 
              type="password" 
              placeholder="Contraseña"
              className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 ring-pink-100 text-center border border-gray-100 text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-[#E6007E] text-white py-4 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all uppercase tracking-widest">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50/40 flex flex-col font-sans text-gray-900">
      <header className="sticky top-0 z-50 bg-white border-b border-pink-100 px-6 py-4 flex items-center justify-between shadow-sm backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-3">
          <img src="/mascota.jpg" className="w-10 h-10 rounded-xl object-cover" alt="Logo" />
          <div>
            <h1 className="font-black text-xl tracking-tighter text-[#E6007E] leading-none">RENDI PORTAL</h1>
            <span className="text-[9px] font-black text-gray-400 uppercase">{rolUsuario}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setAutorizado(false); setUsuario(""); setPassword(""); }} className="px-4 py-2 text-[10px] font-black text-red-400 bg-red-50 rounded-full uppercase">Salir</button>
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="lg:hidden p-2 bg-pink-50 text-[#E6007E] rounded-lg">
            {menuAbierto ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        <aside className={`
          fixed lg:sticky top-[73px] left-0 z-40 w-full lg:w-72 h-[calc(100vh-73px)] bg-white lg:bg-transparent transition-transform duration-300
          ${menuAbierto ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-6 lg:p-10 space-y-3">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6 px-4">Filtrar por</p>
            {categorias.map(cat => (
              <button 
                key={cat}
                onClick={() => { setCategoriaActiva(cat); setMenuAbierto(false); }}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-3xl font-black text-xs transition-all ${categoriaActiva === cat ? 'bg-[#E6007E] text-white shadow-xl shadow-pink-200' : 'text-gray-400 hover:bg-white hover:text-gray-600'}`}
              >
                <div className="flex items-center gap-3">
                  {cat === "Todos" ? <LayoutDashboard size={18}/> : cat === "Ventas" ? <Zap size={18}/> : <ShieldCheck size={18}/>}
                  {cat.toUpperCase()}
                </div>
                <ChevronRight size={14} className={categoriaActiva === cat ? 'opacity-100' : 'opacity-0'}/>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 w-full p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="relative mb-12">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o código..." 
                className="w-full pl-14 pr-6 py-5 bg-white rounded-[2rem] shadow-sm border border-pink-100 outline-none focus:ring-4 ring-pink-100 transition-all font-medium"
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtrados.map((manual) => (
                <div key={manual.id} className="bg-white p-4 rounded-[2.5rem] border border-pink-100 shadow-xl shadow-pink-900/5 hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col">
                  <div className="p-6 flex-1">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block ${manual.cat === 'Gerencia' ? 'bg-indigo-50 text-indigo-500' : 'bg-pink-50 text-[#E6007E]'}`}>
                      {manual.cat}
                    </span>
                    <p className="text-gray-300 text-[10px] font-black mb-1 tracking-tighter uppercase">{manual.codigo}</p>
                    <h3 className="text-gray-900 font-extrabold text-xl leading-snug">{manual.titulo}</h3>
                  </div>
                  <div className="p-2">
                    <a href={manual.link} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-5 rounded-[2rem] font-black text-xs hover:bg-[#E6007E] transition-all shadow-lg active:scale-95 uppercase tracking-widest">
                      <ExternalLink size={16} /> Abrir Documento
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      {menuAbierto && <div onClick={() => setMenuAbierto(false)} className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30 lg:hidden" />}
    </div>
  );
}