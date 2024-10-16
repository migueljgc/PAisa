import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../router/ProtectedRoute';
import { Navbar } from '../Navbar'
import Login from '../src/Menus/Login';
import Registro from '../src/Menus/Registro';
import { HomePage, HomePageDoctor, HomePageSecretaria } from '../src/Menus/HomePage';
import Agendar from '../src/Menus/Usuario/Agendar';
import PQRSD from '../src/Componentes/PQRSD.JSX';
import CrearServicio from '../src/Menus/Admin/crearServicio';
import VerServicios from '../src/Menus/Usuario/verServicios';
import CrearSwiper from '../src/Menus/Admin/crearSwiper';
import { Recovery } from '../src/Componentes/Recovery';
import { ResetPassword } from '../src/Componentes/ResetPassword';
import VerPQRSD from '../src/Menus/Admin/verPQRSD';
import Pacientes from '../src/Menus/Admin/pacientes';
import Servicio from '../src/Menus/Admin/servicio';



export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Recuperacion" element={<Recovery/>} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/activate/:token" element={""} />
        <Route path="/PQRS" element={<PQRSD />} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path="*" element={<Login />} />

        {/* Rutas protegidas */}

        {/* Rutas Admin */}
        <Route path="/HomePagesDoctor" element={
          <ProtectedRoute allowedRoles={['DOCTOR']} element={<HomePageDoctor />} />
        } />


        {/* Rutas Usuario */}
        <Route path="/HomePages" element={
          <ProtectedRoute allowedRoles={['USER']} element={<HomePage />} />
        } />
        <Route path="/Agendar" element={
          <ProtectedRoute allowedRoles={['USER']} element={<Agendar />} />
        } />

        {/* Rutas Secretaria */}
        <Route path="/HomePagesAdmin" element={
          <ProtectedRoute allowedRoles={['SECRETARIA']} element={<HomePageSecretaria />} />
        } />
        <Route path="/CrearServicio" element={
          <ProtectedRoute allowedRoles={['SECRETARIA']} element={<CrearServicio />} />
        } />
        <Route path="/crear-swiper" element={
          <ProtectedRoute allowedRoles={['SECRETARIA']} element={<CrearSwiper />} />
        } />
        <Route path="/ver-pqrsd" element={
          <ProtectedRoute allowedRoles={['SECRETARIA']} element={<VerPQRSD />} />
        } />
        <Route path="/ver-pacientes" element={
          <ProtectedRoute allowedRoles={['SECRETARIA']} element={<Pacientes />} />
        } />
        <Route path="/ver-servicios" element={
          <ProtectedRoute allowedRoles={['SECRETARIA']} element={<Servicio />} />
        } />
      </Route>
    </Routes>
  );
};
