import React, { useEffect, useState } from 'react';
import './VerCita.css'
import PiePagina from '../../Componentes/PiePagina';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { UserinfoUser } from '../../Componentes/Userinfo';

const VerCita = () => {
    const [cita, setCita] = useState([]);
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda

    useEffect(() => {
        const fechtPqrsd = async () => {
            const response = await axios.get('http://localhost:8080/api/Citas/get')
            
            const token = localStorage.getItem('token');
            const response1 = await axios.get('/api/auth/editar', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });console.log(response1)
            const usuario = response1.data.identificacion;
            console.log(usuario);

            if (usuario) {
                const filteredData = response.data.filter(item => item.paciente.identificacion === usuario);
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
        { name: 'Fecha', selector: row => row.fecha, sortable: true },
        { name: 'Doctor', cell: row => <div className="">{row.doctor.name} {row.doctor.lastName} </div>},
        { name: 'Hora', selector: row => row.hora, sortable: true },
        { name: 'Historia clínica', cell: row => <button className="upload-button">Descargar archivo</button> },
        { name: 'Exámenes', cell: row => <button className="upload-button">Descargar archivo</button> }
    ];
    return (
        <div>
            <div class="headerHomePage">
                <img src="/Logo.PNG" alt="Logo" />
                <li className="servicio-HomePage">
                    <div className="servicio-HomePage-button">
                        <a href="/Agendar" className="servicio-HomePage-link">Agendar Cita</a>
                    </div>
                </li>
                <div className="Userinfo">
<UserinfoUser />
                </div>
                
            </div>
            <div className="ver-cita">

                <div className="tabla-cita">
                    <div className="head-cita">
                        <h2>Listado De Citas</h2>
                        <input type="text"
                            placeholder='Buscar por id'
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

export default VerCita;
