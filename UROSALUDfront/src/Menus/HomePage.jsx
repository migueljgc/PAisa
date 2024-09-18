import React from 'react';
import { Header } from '../Componentes/Header';
import PiePagina from '../Componentes/PiePagina';
import '../Menus/HomePage.css'

export const HomePage = () => {
    return (
        <div className='HomePage'>
            <div className="headerHomepage">
                <Header />
            </div>
            <div className="homepage">
                <div className="datoshomepage">
                    <p>
                    En Urosalud, nos dedicamos a ofrecer soluciones 
                    innovadoras y personalizadas para la salud 
                    urológica. Nuestro equipo médico experto está 
                    comprometido con la excelencia y el bienestar de 
                    nuestros pacientes.
                    </p>
                </div>
                <div className="imghomepage">
                    <img src="/background.jpg" alt="" />
                </div>
            </div>
            <div className="pieHomePage">
                <PiePagina />
            </div>
        </div>
    );
}


