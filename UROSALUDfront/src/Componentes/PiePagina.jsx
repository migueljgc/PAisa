import React from 'react';
import '../Componentes/PiePagina.css'

const PiePagina = () => {
    return (
        <div className="PiePagina">
            <div className="telefonoContact">
                <label >+57 308 4512314</label>
            </div>
            <div className="PQRSContact">
                <a href="">PQRSD </a>
            </div>
            <div className="Copyrigth">
                <label>Copyrigth @2024 </label>
            </div>
        </div>
    );
}

export default PiePagina;
