import React from 'react';
import './SubirArchivo.css'

export const SubirArchivo = ({ onClose, onUpload }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Subir historia clinica</h3>
                <div className="modal-Upload">
                    <input type="file" onChange={onUpload} />
                </div>
                <div className="modal-buttons">
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}
export const SubirArchivoExamen = ({ onClose, onUpload }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Subir Examen</h3>
                <div className="modal-Upload">
                    <input type="file" onChange={onUpload} />
                </div>
                <div className="modal-buttons">
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

