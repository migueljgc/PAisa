import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../router/ProtectedRoute';
import {Navbar} from '../Navbar'
import Login from '../src/Menus/Login';
import Registro from '../src/Menus/Registro';
import {HomePage, HomePageDoctor, HomePageSecretaria} from '../src/Menus/HomePage';
import Agendar from '../src/Menus/Usuario/Agendar';
import PQRSD from '../src/Componentes/PQRSD.JSX';



export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Login/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Recuperacion" element={""} />
        <Route path="/Registro" element={<Registro/>} />
        <Route path="/activate/:token" element={""} />
        <Route path="/PQRS" element={<PQRSD/>} />
        <Route path="/reset-password/:token" element={""} />
        <Route path="*" element={<Login/>} />

        {/* Rutas protegidas */}

        {/* Rutas Admin */}
        <Route path="/HomePagesDoctor" element={
          <ProtectedRoute allowedRoles={['DOCTOR']} element={<HomePageDoctor/>} />
        } />
        

        {/* Rutas Usuario */}
        <Route path="/HomePages" element={
          <ProtectedRoute allowedRoles={['USER']} element={<HomePage/>} />
        } />
        <Route path="/Agendar" element={
          <ProtectedRoute allowedRoles={['USER']} element={<Agendar/>} />
        } />

        {/* Rutas Secretaria */}
        <Route path="/HomePagesSecretaria" element={
          <ProtectedRoute allowedRoles={['SECRETARIA']} element={<HomePageSecretaria/>} />
        } />


      </Route>
    </Routes>
  );
};
