import React from 'react';
import { Header, HeaderDoctor, HeaderSecretaria } from '../Componentes/Header';
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


export const HomePageDoctor = () => {
    return (
        <div className='HomePage'>
            <div className="headerHomepage">
                <HeaderDoctor />
            </div>
            <div className="homepage">
                <div className="datoshomepage">
                    <p>
                    Cada vida que tocas es un 
                    recordatorio de que tu vocacion
                    no solo cura cuerpos, sino
                    tambien almas. ¡Sigue adelante, 
                    doc, por que tu trabajo cambia!
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

export const HomePageSecretaria = () => {
    return (
        <div className='HomePage'>
            <div className="headerHomepage">
                <HeaderSecretaria />
            </div>
            <div className="homepage">
                <div className="datoshomepage">
                    <p>
                    Tu organizacion y dedicacion 
                    son el motor silencioso que
                    mantiene todo en marcha. Cada 
                    detalle que cuidas hace la 
                    diferencia en el exito de todos. 
                    ¡Sigue sindo la clave del buen 
                    funcionamiento!
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