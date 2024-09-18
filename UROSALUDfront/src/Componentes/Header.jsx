import React from 'react';
import '../Componentes/Header.css'
import { useNavigate } from 'react-router-dom';
import {UserinfoUser} from '../Componentes/Userinfo'

export const Header = () => {
    const Navigate = useNavigate();
    const handleagendar = () => {
        Navigate('/Agendar')

    }
    return (
        <div className="Header">
            <div className="logo">
                <img src="/Logo - Urosalud_20240917_141636_0001.png" alt="Logo" />
            </div>
            <div className="inicioheader">
                <a href="">Inicio</a>
            </div>
            <div className="Serviciosheader">
                <a href="">Servicios</a>
            </div>
            <div className="especialistasheader">
                <a href="">Especialistas</a>
            </div>
            <div className="agendarcitaheader">
                <button onClick={handleagendar}>Agendar Cita</button>
            </div>
            <div className="iconprofileheader">
                <UserinfoUser />
            </div>
        </div>
    );
}

