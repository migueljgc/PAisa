import React, { useEffect, useState } from 'react';
import PiePagina from './PiePagina';
import './PQRSD.css'
import axios from 'axios';

const PQRSD = () => {
    const [tiposSoli, setTiposSoli] = useState([]);
    const [formData, setFormData] = useState({
        fechaHora: '',
        descripcion: '',
        tiposSolicitud: ''
    });

    const fechtTiposSoli = async () => {
        const response = await axios.get('/api/tipoSolicitud/get');
        setTiposSoli(response.data)
        console.log('tipos solicitud ', response.data)
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        fechtTiposSoli();
    }, [])
    const handleReset = () => {
        setFormData({
            fechaHora: '',
            descripcion: '',
            tiposSolicitud: ''
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const selectedTiposSoli = tiposSoli.find(type => type.id === parseInt(formData.tiposSolicitud));
        const response = await axios.post('/Pqrs/save', {
            fechaHora: formData.fechaHora,
            descripcion: formData.descripcion,
            tiposSolicitud: { id: selectedTiposSoli.id }
        });
        alert('Exito')
        handleReset();
    }
    catch (error){
        console.error(error)
    }
    }


    return (
        <div className='PQRSD'>

            <div className="PQRSDpage">
                <div className="datosPQRSD">
                    <h2>
                        Formulario de Peticiones, Quejas, Reclamos y Sugerencias
                    </h2>
                </div>
                <div className="frompqrsd">
                    <form onSubmit={handleSubmit}>
                        <div className="tipoandfecha">
                            <div className="tipospqrs">
                                <label>Tipo de solicitud:</label>
                                <select name="tiposSolicitud" id="tiposSolicitud"
                                    value={formData.tiposSolicitud}
                                    onChange={handleChange} required
                                >
                                    <option >Seleccione Tipo de Solicitd</option>
                                    {tiposSoli.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.descripcion}
                                        </option>
                                    ))}


                                </select>
                            </div>
                            <div className="fechapqrs">
                                <label>Fecha:</label>
                                <input type="date" name='fechaHora' id='fechaHora'
                                    value={formData.fechaHora}
                                    onChange={handleChange} required
                                />
                            </div>

                        </div>
                        <div className="descripcionpqrs">
                            <label>Descripcion:</label>
                            <textarea name="descripcion" id="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange} required
                            />
                        </div>
                        <div className="btnpqrs">
                            <button type='onSubmit'>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="piePQRSD">
                <PiePagina />
            </div>
        </div>
    );
}

export default PQRSD;
