'use client';
import './globals.css';
import React, { useState, FormEvent } from 'react';
import { 
  Search, LayoutDashboard, ShieldCheck, Zap, ExternalLink, Menu, X, User, LogOut, BookOpen, PlayCircle, FileText
} from 'lucide-react';

interface Manual {
  id: number;
  codigo: string;
  titulo: string;
  cat: string;
  link: string;
  videoUrl?: string;
  onePageUrl?: string;
  descripcion?: string;
  esPiloto?: boolean;
}

export default function RendichicasPortalDynamic() {
  const [autorizado, setAutorizado] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");
  const [categoriaActiva, setCategoriaActiva] = useState<string>("Todos");
  const [menuAbierto, setMenuAbierto] = useState<boolean>(false);
  const [rolUsuario, setRolUsuario] = useState<string>(""); 

  const usuariosValidos = [
    { user: "ventas.estacion", pass: "vendedor2026", rol: "VENDEDOR" },
    { user: "gerente.estacion", pass: "gerente2026", rol: "GERENTE/SUPERVISOR" }
  ];

  const manuales: Manual[] = [
    { 
      id: 1, 
      codigo: "MOP-EST-VEN-001-R01", 
      titulo: "Conociendo tu Estación", 
      cat: "Vendedor", 
      link: "/docs/Conociendo tu estación.pdf",
      videoUrl: "https://vimeo.com/video_id", 
      onePageUrl: "/docs/onepage_estacion.pdf", 
      descripcion: "Guía completa multimedia sobre la infraestructura y estándares de la estación.",
      esPiloto: true 
    },
    { 
      id: 10, 
      codigo: "MOP-COR-GEN-028-RO1", 
      titulo: "Uso aplicativo car mobile", 
      cat: "Vendedor", 
      link: "/docs/car-mobile.pdf",
      // VIDEO ACTUALIZADO AQUÍ
      videoUrl: "https://vimeo.com/1192095193?share=copy&fl=sv&fe=ci", 
      onePageUrl: "/docs/onepage-carmobile.pdf", 
      descripcion: "Videotutorial oficial para el uso correcto del aplicativo en pista.",
      esPiloto: true 
    },
    { id: 2, codigo: "MOP-EST-VEN-002-R01", titulo: "Uso del Dispensario", cat: "Vendedor", link: "/docs/MOP-EST-VEN-002-R01.pdf" },
    { id: 3, codigo: "MOP-EST-VEN-005-R01", titulo: "Servicio al Cliente", cat: "Vendedor", link: "/docs/Manual servicio al cliente.pdf" },
    { id: 4, codigo: "MOP-EST-GER-001-R01", titulo: "Conociendo tu Estación (Gerencia)", cat: "Gerencia", link: "/docs/MOP-EST-GER-001-R01.pdf" },
    { id: 5, codigo: "MOP-EST-GER-002-R01", titulo: "Inicio de Turno", cat: "Gerencia", link: "/docs/MOP-EST-GER-002-R01.pdf" },
    { id: 6, codigo: "MOP-EST-GER-003-R01", titulo: "Liquidación de Turno", cat: "Gerencia", link: "/docs/MOP-EST-GER-003-R01.pdf" }
  ];

  const filtrados = manuales.filter(m => {
    const cumpleBusqueda = m.titulo.toLowerCase().includes(busqueda.toLowerCase()) || m.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleCategoria = categoriaActiva === "Todos" || m.cat === categoriaActiva;
    let cumpleRol = rolUsuario === "GERENTE/SUPERVISOR" || (rolUsuario === "VENDEDOR" && m.cat === "Vendedor");
    return cumpleBusqueda && cumpleCategoria && cumpleRol;
  });

  const manejarLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginExitoso = usuariosValidos.find(u => u.user === usuario && u.pass === password);
    if (loginExitoso) {
      setRolUsuario(loginExitoso.rol);
      setAutorizado(true);
    } else {
      alert("Credenciales incorrectas ");
    }
  };

  const categorias = rolUsuario === "VENDEDOR" ? ["Vendedor"] : ["Todos", "Vendedor", "Gerencia"];

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E6007E] to-[#9d0056] flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-[400px]">
          <div className="flex justify-center mb-6"><img src="/mascota.jpg" className="w-20 h-20 rounded-2xl object-cover shadow-md" alt="Logo" /></div>
          <h2 className="text-2xl font-black text-center text-gray-800 mb-2">Portal Estaciones</h2>
          <p className="text-gray-400 text-center mb-8 font-medium text-sm">Acceso Corporativo 🌱</p>
          <form onSubmit={manejarLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E6007E]" size={18} />
              <input type="text" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 ring-[#E6007E] text-gray-900 font-semibold" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
            </div>
            <input type="password" name="password" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 ring-[#E6007E] text-gray-900 font-semibold text-center" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="w-full bg-[#E6007E] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#c4006b] transition-all">ACCEDER</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#E6007E] p-2 rounded-xl"><BookOpen className="text-white" size={20} /></div>
          <h1 className="font-black text-xl text-gray-800">RENDI<span className="text-[#E6007E]">PORTAL</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setAutorizado(false); setUsuario(""); setPassword(""); }} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold text-xs hover:bg-red-50 hover:text-red-500 transition-all"><LogOut size={16} /></button>
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="lg:hidden p-2 text-gray-600 bg-gray-100 rounded-xl"><Menu size={20}/></button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        <aside className={`fixed lg:sticky top-[73px] left-0 z-40 w-full lg:w-72 h-[calc(100vh-73px)] bg-white lg:bg-transparent transition-all duration-300 ${menuAbierto ? 'translate-y-0 opacity-100' : '-translate-y-full lg:translate-y-0 hidden lg:block'}`}>
          <nav className="p-6 lg:p-8 space-y-2">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 px-4">Filtrar por</p>
            {categorias.map(cat => (
              <button key={cat} onClick={() => { setCategoriaActiva(cat); setMenuAbierto(false); }} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${categoriaActiva === cat ? 'bg-[#E6007E] text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}>
                {cat === "Todos" ? <LayoutDashboard size={18}/> : cat === "Vendedor" ? <Zap size={18}/> : <ShieldCheck size={18}/>}
                {cat.toUpperCase()}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-5xl mx-auto">
            <div className="relative mb-10 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E6007E] transition-colors" size={20} />
              <input type="text" placeholder="Buscar manual..." className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 outline-none focus:ring-2 ring-[#E6007E]/20 text-gray-800 font-medium transition-all" onChange={(e) => setBusqueda(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtrados.map((m) => (
                <div key={m.id} className={`bg-white rounded-[2rem] border shadow-sm p-4 flex flex-col group transition-all ${m.esPiloto ? 'border-[#E6007E]/30 ring-1 ring-[#E6007E]/10' : 'border-gray-100 hover:shadow-xl'}`}>
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${m.cat === 'Gerencia' ? 'bg-indigo-50 text-indigo-600' : 'bg-pink-50 text-[#E6007E]'}`}>{m.cat}</span>
                      {m.esPiloto && <span className="bg-[#E6007E] text-white text-[9px] px-2 py-0.5 rounded-full font-bold animate-pulse">HUB MULTIMEDIA</span>}
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-800 leading-tight group-hover:text-[#E6007E] transition-colors">{m.titulo}</h3>
                    <p className="text-[11px] font-bold text-gray-400 mt-2 tracking-widest">{m.codigo}</p>
                    {m.descripcion && <p className="text-sm text-gray-500 mt-3 leading-relaxed">{m.descripcion}</p>}
                  </div>

                  <div className="grid grid-cols-1 gap-2 p-2">
                    <a href={m.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-2xl font-bold text-xs hover:bg-[#E6007E] transition-all shadow-md active:scale-95">
                      <FileText size={16} /> MANUAL PDF
                    </a>
                    
                    {m.esPiloto && (
                      <div className="grid grid-cols-2 gap-2">
                        <a href={m.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-pink-50 text-[#E6007E] py-4 rounded-2xl font-bold text-[10px] hover:bg-pink-100 transition-all uppercase tracking-tight">
                          <PlayCircle size={14} /> Video-Guía
                        </a>
                        <a href={m.onePageUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-4 rounded-2xl font-bold text-[10px] hover:bg-indigo-100 transition-all uppercase tracking-tight">
                          <Zap size={14} /> One-Page
                        </a>
                      </div>
                    )}
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