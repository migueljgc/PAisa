import React, { useEffect, useRef, useState } from 'react';
import './crearServicio.css'
import { AccesoAdmin, HeaderSecretaria } from '../../Componentes/Header';
import PiePagina from '../../Componentes/PiePagina';
import axios from 'axios';

const CrearServicio = () => {

    const [data, setData] = useState({
        nombre: '',
        descripcion: '',

    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        document.title = "Crear Servicio";
    }, []);
    const handleData = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value.charAt(0).toUpperCase() + value.slice(1), // Capitaliza la primera letra
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setErrorMessage(''); // Limpiar el mensaje de error si el archivo es válido
        } else {
            setSelectedFile(null);
            setErrorMessage('Solo se permiten archivos de imagen.');
        }
    };
    const resetForm = () => {
        setData({
            nombre: '',
            descripcion: '',
        });
        setSelectedFile(null);
        setErrorMessage('');
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

    };
    const handleChange = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setErrorMessage('Por favor selecciona un archivo de imagen.');
            return;
        }
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('descripcion', data.descripcion);
        formData.append('img', selectedFile);

        try {
            const response = await axios.post('http://localhost:8080/api/Especialidad/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Servicio guardado', response.data);
            alert('Servicio guardada correctamente')
            resetForm();
        } catch (error) {
            console.error('Error al guardar el producto: ', error);
        }
    }
    return (
        <div className='CrearServicio'>
            <AccesoAdmin />
            <div className="cuerpoServicio">
                <div className="form-crear-servicio">
                    <form className='crear-servicio-form' onSubmit={handleChange}>
                        <h2>
                            Crear Servicio
                        </h2>
                        <div className="crear-servicio">


                            <div className='input-box-crear-servicio' >
                                <label>Servicio</label>
                                <input type="text" name="nombre" id="nombre" placeholder='Ingrese el Nombre del servicio' value={data.nombre} onChange={handleData} required />
                            </div>
                            <div className='input-box-crear-servicio'>
                                <label>Descripcion</label>
                                <textarea rows={8} name="descripcion" id="descripcion" placeholder='Ingrese una breve descripcion del servicio' value={data.descripcion} onChange={handleData} required />
                            </div>
                            <div className='input-file-crear-servicio'>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} />
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </div>
                            <div className='btn-crear-servicio'>
                                <button type='submit'>Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="pieServicio">
                <PiePagina />
            </div>
        </div>
    );
}

export default CrearServicio;
