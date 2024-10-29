            
import React, { useEffect, useState } from 'react';
import PiePagina from '../../Componentes/PiePagina';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { AccesoDoc } from '../../Componentes/Header';

const VerCitas = () => {
    const [cita, setCita] = useState([]);
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda

    useEffect(() => {
        const fechtPqrsd = async () => {
            const response = await axios.get('http://localhost:8080/api/Citas/get')
            console.log(response)
            const token = localStorage.getItem('token');
            const response1 = await axios.get('/api/auth/editar', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });console.log(response1)
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


    // Definir las columnas de la tabla
    const columns = [
        { name: 'ID cita', selector: row => row.id, sortable: true },
        { name: 'Paciente', selector: row => row.paciente.name, sortable: true },
        { name: 'Fecha', selector: row => row.fecha, sortable: true },
        { name: 'Hora', selector: row => row.hora, sortable: true },
        { name: 'Historia clínica', cell: row => <button className="upload-button">Cargar archivo</button> },
        { name: 'Exámenes', cell: row => <button className="upload-button">Cargar archivo</button> }
    ];
    return (
        <div>
            <AccesoDoc/>
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
                                style: {
                                    backgroundColor: '#89ceff', 
                                },
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
        </div>
    );
}

export default VerCitas;