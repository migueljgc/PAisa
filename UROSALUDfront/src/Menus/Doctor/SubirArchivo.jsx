import React, { useState } from 'react';
import './SubirArchivo.css'

export const SubirArchivo = ({ onClose, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    // Maneja la selección del archivo
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Llama a `onUpload` con el archivo seleccionado
    const handleUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile); // Pasa el archivo al componente principal
        } else {
            alert("Por favor, selecciona un archivo antes de enviar.");
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Subir historia clinica</h3>
                <div className="modal-Upload">
                    <input type="file" onChange={handleFileChange}/>
                </div>
                <div className="modal-buttons">
                    <button onClick={handleUpload}>Enviar</button>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}
export const SubirArchivoExamen = ({ onClose, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    // Maneja la selección del archivo
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Llama a `onUpload` con el archivo seleccionado
    const handleUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile); // Pasa el archivo al componente principal
        } else {
            alert("Por favor, selecciona un archivo antes de enviar.");
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Subir Examen</h3>
                <div className="modal-Upload">
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="modal-buttons">
                    <button onClick={handleUpload}>Enviar</button>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

