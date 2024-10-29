import React, { useEffect, useRef, useState } from 'react';
import './crearSwiper.css'
import PiePagina from '../../Componentes/PiePagina';
import { AccesoAdmin, HeaderSecretaria } from '../../Componentes/Header';
import axios from 'axios';

const CrearSwiper = () => {
    const [data, setData] = useState({
        nombre: '',
        
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
        formData.append('img', selectedFile);

        try {
            const response = await axios.post('http://localhost:8080/api/Swiper/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Swiper guardado', response.data);
            alert('Swiper guardada correctamente')
            resetForm();
        } catch (error) {
            console.error('Error al guardar el producto: ', error);
        }
    }
    return (
        <div className='CrearSwiper'>
            <AccesoAdmin />
            <div className="cuerpoSwiper">
                <div className="form-crear-Swiper">
                    <form className='crear-Swiper-form' onSubmit={handleChange}>
                        <h2>
                            Agregar Slider
                        </h2>
                        <div className='input-box-crear-Swiper' >
                            <label>Servicio</label>
                            <input type="text" name="nombre" id="nombre" placeholder='Ingrese el Nombre del Swiper' value={data.nombre} onChange={handleData} required />
                        </div>
                        <div className='input-file-crear-Swiper'>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                        <div className='btn-crear-Swiper'>
                            <button type='submit'>Enviar</button>
                        </div>

                    </form>
                </div>
            </div>

            <div className="pieSwiper">
                <PiePagina />
            </div>
        </div>
    );
}

export default CrearSwiper;
