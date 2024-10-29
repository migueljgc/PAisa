import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AccesoAdmin } from '../../Componentes/Header';
import DataTable from 'react-data-table-component';
import './servicio.css'
import PiePagina from '../../Componentes/PiePagina';

const Servicio = () => {
    const [servicio, setServicio] = useState([]);

    useEffect(() => {
        const fetchServicio = async () => {
            const response = await axios.get('http://localhost:8080/api/Servicio/get')
            console.log(response.data)
            setServicio(response.data)
        }
        fetchServicio();
    }, [])

    // Definir las columnas de la tabla
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre
        },
        {
            name: 'Descripcion',
            selector: row => row.descripcion,
            sortable: true
        },

    ];
    return (
        <div>
            <AccesoAdmin />
            <div className="ver-servicio">

                <div className="tabla-servicio">
                    <h2>Lista De Servicios</h2>
                    <DataTable
                        columns={columns}
                        data={servicio}
                        responsive
                        pagination
                        paginationPerPage={6}
                        customStyles={{
                            headCells: {
                                style: {
                                    backgroundColor: 'pink', // Encabezado en rosa fuerte
                                    color: 'black',
                                },
                            },
                            rows: {
                                style: {
                                    backgroundColor: '#ffe4e1', // Celdas en rosa claro
                                },
                                highlightOnHoverStyle: {
                                    backgroundColor: '#ffc0cb', // Hover sobre filas
                                },
                            },
                            cells: {
                                style: {
                                    borderRight: '3px solid pink', // Borde derecho en cada celda
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
            <div className="pie">
                <PiePagina />
            </div>
        </div>
    );
}

export default Servicio;
