import React, { useEffect, useState } from 'react';
import './verServicio.css'
import { Header } from '../../Componentes/Header';
import PiePagina from '../../Componentes/PiePagina';
import axios from 'axios';

const VerServicios = () => {
    const [servicio, setServicio] = useState([]);
    const [selectedServicio, setSelectedServicio] = useState(null);

    useEffect(() => {
        fetchEspecialidades();
    }, []);

    const fetchEspecialidades = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Especialidad/get');
            setServicio(response.data);
        } catch (error) {
            console.error('Error al obtener especialidades: ', error);
        }
    };
    const openModal = (servicio) => {
        setSelectedServicio(servicio);
    };

    const closeModal = () => {
        setSelectedServicio(null);
    };

    return (
        <div className='VerServicios'>
            <div className="headerVerServicio">
                <Header />
            </div>
            <div className="cuerpo-ver-Servicio">
                
                <div className="ver-servicio">
                    <div className="servicio-container">
                        <h2>Nuestros servicios</h2>
                        <p>Contamos con estándares de calidad para brindarle a nuestros usuarios un excelente servicio.</p>
                        <div className="servicio-grid">
                            {servicio.map((servicio, index) => (
                                <div key={index} className="servicio-card" onClick={() => openModal(servicio)}>
                                    <img
                                        src={`data:image/jpeg;base64,${servicio.img}`}
                                        alt={servicio.nombre}
                                        className="servicio-imagen"
                                    />
                                    <h3 className="servicio-nombre">{servicio.nombre}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Modal */}
                        {selectedServicio && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={closeModal}>&times;</span>
                                    <h2>{selectedServicio.nombre}</h2>
                                    <img
                                        src={`data:image/jpeg;base64,${selectedServicio.img}`}
                                        alt={selectedServicio.nombre}
                                        className="modal-imagen"
                                    />
                                    <p>{selectedServicio.descripcion}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="pieCrearServicio">
                <PiePagina />
            </div>
        </div>
    );
};



export default VerServicios;
