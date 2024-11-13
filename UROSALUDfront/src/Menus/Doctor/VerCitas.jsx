
import React, { useEffect, useState } from 'react';
import PiePagina from '../../Componentes/PiePagina';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { AccesoDoc } from '../../Componentes/Header';
import { SubirArchivo, SubirArchivoExamen } from './SubirArchivo';

const VerCitas = () => {
    const [cita, setCita] = useState([]);
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleExamen, setModalVisibleExamen] = useState(false);
    const [currentUpload, setCurrentUpload] = useState(null);

    useEffect(() => {
        const fechtPqrsd = async () => {
            const response = await axios.get('/api/Citas/get')
            console.log(response)
            const token = localStorage.getItem('token');
            const response1 = await axios.get('/api/auth/editar', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }); console.log(response1)
            const usuario = response1.data.identificacion;
            console.log(usuario);

            if (usuario) {
                const filteredData = response.data.filter(item => item.doctor.identificacion === usuario);
                console.log(filteredData);
                setCita(filteredData)
            }
        }
        fechtPqrsd();
    }, [])
    // Filtrar datos cuando cambie el texto de búsqueda
    // Filtrar datos cuando cambie el texto de búsqueda
    const filtered = cita.filter(item =>
        String(item.id).toLowerCase().includes(filterText.toLowerCase())
    );


    const columns = [
        { name: 'ID cita', selector: row => row.id, sortable: true },
        { name: 'Paciente', selector: row => row.paciente.name, sortable: true },
        { name: 'Fecha', selector: row => row.fecha, sortable: true },
        { name: 'Hora', selector: row => row.hora, sortable: true },
        {
            name: 'Historia clínica',
            cell: row => (
                <span>
                    {row.archivoAnswerHistoria ? (
                        <a href={`/api/Citas/download/${encodeURIComponent(row.archivoAnswerHistoria.split('\\').pop())}`} download target="_blank" rel="noopener noreferrer">
                            <button className='upload-button'>Descargar archivo</button>
                        </a>
                    ) : (
                        <button
                            className="upload-button"
                            onClick={() => openModal(row.id, 'historiaClinica')}
                        >
                            Cargar archivo
                        </button>
                    )}
                </span>
            )
        },
        {
            name: 'Exámenes',
            cell: row => (
                <span>
                    {row.archivoAnswerMedica ? (
                        <a href={`/api/Citas/download/${encodeURIComponent(row.archivoAnswerMedica.split(/[/\\]/).pop())}`} download target="_blank" rel="noopener noreferrer">
                            <button className='upload-button'>Descargar archivo</button>
                        </a>
                    ) : (
                        <button
                            className="upload-button"
                            onClick={() => openModalExamen(row.id, 'examenes')}
                        >
                            Cargar archivo
                        </button>
                    )}
                </span>
            )
        }
    ];



    const openModal = (id, type) => {
        setCurrentUpload({ id, type });
        setModalVisible(true);
    };
    const openModalExamen = (id, type) => {
        setCurrentUpload({ id, type });
        setModalVisibleExamen(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalVisibleExamen(false);
        setCurrentUpload(null);
    };

    // Función para subir el archivo de historia clínica
    const handleUploadHistoria = async (file) => {
        if (!file || !currentUpload) return;

        const formData = new FormData();
        formData.append('archivo', file);

        try {
            const response = await axios.put(`/api/Citas/updateHistoria/${currentUpload.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Historia clínica subida exitosamente.", response)
            alert("Historia clínica subida exitosamente.");
            window.location.reload();

            closeModal(); // Cerrar el modal después de subir el archivo
        } catch (error) {
            console.error("Error al subir la historia clínica:", error);
            alert("Hubo un error al subir la historia clínica.");
        }
    };

    // Función para subir el archivo de exámenes
    const handleUploadExamen = async (file) => {
        if (!file || !currentUpload) return;

        const formData = new FormData();
        formData.append('archivo', file);

        try {
            await axios.put(`/api/Citas/updateExamen/${currentUpload.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Examen subido exitosamente.");
            window.location.reload();
            closeModal(); // Cerrar el modal después de subir el archivo
        } catch (error) {
            console.error("Error al subir el examen:", error);
            alert("Hubo un error al subir el examen.");
        }
    };


    return (
        <div>
            <AccesoDoc />
            <div className="ver-cita">

                <div className="tabla-cita">
                    <div className="head-cita">
                        <h2>Mis citas</h2>
                        <input type="text"
                            placeholder='Buscar por tipo de id'
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)} // Actualiza el estado del texto de búsqueda
                        />
                    </div>

                    <DataTable
                        columns={columns}
                        data={filtered}
                        className='react-datatable'
                        responsive
                        pagination
                        paginationPerPage={6}
                        customStyles={{
                            headCells: {
                                style: {
                                    backgroundColor: '#89ceff',
                                    color: 'black',
                                    fontSize: '1.2rem',
                                },
                            },
                            rows: {
                                highlightOnHoverStyle: {
                                    backgroundColor: '#ffc0cb',
                                },
                            },
                            cells: {
                                style: {
                                    borderRight: '3px solid blue',
                                },
                            },
                            tableWrapper: {
                                style: {
                                    borderRadius: '4px',  // Aquí aplicamos el radio a toda la tabla
                                    overflow: 'hidden',   // Asegura que el contenido no desborde los bordes redondeados
                                    border: '1px solid pink', // Un borde adicional alrededor de la tabla si lo deseas
                                }
                            },
                        }}
                    />
                </div>

            </div>
            <div className="pieHomePage">
                <PiePagina />
            </div>
            {modalVisible && (
                <SubirArchivo onClose={closeModal} onUpload={handleUploadHistoria} />
            )}
            {modalVisibleExamen && (
                <SubirArchivoExamen onClose={closeModal} onUpload={handleUploadExamen} />
            )}
        </div>
    );
}

export default VerCitas;