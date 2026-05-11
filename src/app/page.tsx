'use client';
import './globals.css';
import React, { useState } from 'react';
import { 
  Search, LayoutDashboard, ShieldCheck, Zap, ExternalLink, Menu, X, ChevronRight
} from 'lucide-react';

export default function RendichicasPortalDynamic() {
  const [autorizado, setAutorizado] = useState(false);
  const [password, setPassword] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [menuAbierto, setMenuAbierto] = useState(false);

  const CLAVE_ACCESO = "rendi2026"; 

  const manuales = [
    { id: 1, codigo: "MOP-EST-VEN-001-R01", titulo: "Conociendo tu Estación", cat: "Ventas", link: "/docs/Conociendo tu estación.pdf" },
    { id: 2, codigo: "MOP-EST-VEN-002-R01", titulo: "Uso del Dispensario", cat: "Ventas", link: "/docs/MOP-EST-VEN-002-R01.pdf" },
    { id: 5, codigo: "MOP-EST-VEN-005-R01", titulo: "Servicio al Cliente", cat: "Ventas", link: "/docs/Manual servicio al cliente.pdf" },
    { id: 7, codigo: "MOP-EST-GER-001-R01", titulo: "Conociendo tu Estación (Gerencia)", cat: "Gerencia", link: "/docs/MOP-EST-GER-001-R01.pdf" },
    { id: 8, codigo: "MOP-EST-GER-002-R01", titulo: "Inicio de Turno", cat: "Gerencia", link: "/docs/MOP-EST-GER-002-R01.pdf" },
    { id: 9, codigo: "MOP-EST-GER-003-R01", titulo: "Liquidación de Turno", cat: "Gerencia", link: "/docs/MOP-EST-GER-003-R01.pdf" },
    { id: 10, codigo: "MOP-COR-VEN-028-RO1", titulo: "Uso aplicativo car mobile", cat: "Ventas", link: "/docs/car-mobile.pdf" }
  ];

  const categorias = ["Todos", "Ventas", "Gerencia"];

  const filtrados = manuales.filter(m => {
    const cumpleBusqueda = m.titulo.toLowerCase().includes(busqueda.toLowerCase()) || m.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleCategoria = categoriaActiva === "Todos" || m.cat === categoriaActiva;
    return cumpleBusqueda && cumpleCategoria;
  });

  const manejarLogin = (e: any) => {
    e.preventDefault();
    if (password === CLAVE_ACCESO) setAutorizado(true);
    else alert("Clave incorrecta 🌱");
  };

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-[#E6007E] flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md text-center">
          <img src="/mascota.jpg" className="w-28 h-28 rounded-full border-4 border-pink-100 shadow-xl object-cover mx-auto mb-6" alt="Mascota" />
          <h1 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Portal Estaciones</h1>
          <p className="text-gray-500 mb-8 font-medium">Acceso Privado 🌱</p>
          <form onSubmit={manejarLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Contraseña"
              className="w-full px-6 py-5 bg-gray-100 rounded-2xl outline-none focus:ring-4 ring-pink-200 text-center text-2xl"
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
    <div className="min-h-screen bg-pink-50/50 flex flex-col