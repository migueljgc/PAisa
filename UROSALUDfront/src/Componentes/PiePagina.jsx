import React from 'react';
import '../Componentes/PiePagina.css'
import { FaPhoneAlt } from 'react-icons/fa';
import { BsEnvelope } from 'react-icons/bs';

const PiePagina = () => {
    return (
        <div className="PiePagina">
            <div className="telefonoContact">
                <FaPhoneAlt className='icon-house' />
                <label >+57 308 4512314</label>
            </div>
            <div className="PQRSContact">
                <BsEnvelope className='icon-house' />
                <a href="/PQRS">PQRSD </a>
            </div>
            <div className="Copyrigth">
                <label>Copyrigth @2024 </label>
            </div>
        </div>
    );
}

export default PiePagina;
