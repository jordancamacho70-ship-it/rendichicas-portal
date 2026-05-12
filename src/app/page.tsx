'use client';
import './globals.css';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { 
  Search, LayoutDashboard, ShieldCheck, Zap, ExternalLink, Menu, X, ChevronRight, User, LogOut, BookOpen
} from 'lucide-react';

interface Manual {
  id: number;
  codigo: string;
  titulo: string;
  cat: string;
  link: string;
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
    let cumpleRol = rolUsuario === "GERENTE/SUPERVISOR" || (rolUsuario === "VENDEDOR" && m.cat === "Ventas");
    return cumpleBusqueda && cumpleCategoria && cumpleRol;
  });

  const manejarLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginExitoso = usuariosValidos.find(u => u.user === usuario && u.pass === password);
    if (loginExitoso) {
      setRolUsuario(loginExitoso.rol);
      setAutorizado(true);
    } else {
      alert("Credenciales incorrectas 🌱");
    }
  };

  const categorias = rolUsuario === "VENDEDOR" ? ["Ventas"] : ["Todos", "Ventas", "Gerencia"];

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E6007E] to-[#9d0056] flex items-center justify-center p-4 font-sans">
        <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-[400px] border border-white/20">
          <div className="flex justify-center mb-8">
            <div className="bg-pink-50 p-4 rounded-3xl">
               <img src="/mascota.jpg" className="w-20 h-20 rounded-2xl object-cover shadow-md" alt="Logo" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-center text-gray-800 mb-2 tracking-tighter">¡Bienvenido!</h2>
          <p className="text-gray-500 text-center mb-8 font-medium">Portal Digital de Estaciones</p>
          
          <form onSubmit={manejarLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-4 tracking-widest">Usuario</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E6007E]" size={20} />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-[#E6007E] transition-all text-gray-900 font-semibold"
                  value={usuario