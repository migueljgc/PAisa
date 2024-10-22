import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AccesoAdmin } from '../../Componentes/Header';
import DataTable from 'react-data-table-component';
import './verPQRSD.css'
import PiePagina from '../../Componentes/PiePagina';

const VerPQRSD = () => {
    const [pqrsd, setPqrsd] = useState([]);
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda

    useEffect(() => {
        const fechtPqrsd = async () => {
            const response = await axios.get('http://localhost:8080/Pqrs/get')
            console.log(pqrsd)
            setPqrsd(response.data)
        }
        fechtPqrsd();
    }, [])
    // Filtrar datos cuando cambie el texto de búsqueda
    // Filtrar datos cuando cambie el texto de búsqueda
    const filtered = pqrsd.filter(item =>
        (item.tiposSolicitud?.description && item.tiposSolicitud.description.toLowerCase().includes(filterText.toLowerCase()))
    );

    // Definir las columnas de la tabla
    const columns = [
        {
            name: 'Tipo de Solicitud',
            selector: row => row.tiposSolicitud?.description
        },
        {
            name: 'Fecha',
            selector: row => row.fechaHora,
            sortable: true
        },
        {
            name: 'Descripcion',
            selector: row => row.descripcion
        },



    ];

    return (
        <div>
            <AccesoAdmin />
            <div className="ver-pqrsd">

                <div className="tabla-pqrsd">
                    <div className="head-pqrs">
                        <h2>Listado De PQRSD</h2>
                        <input type="text"
                            placeholder='Buscar por tipo de solicitud'
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
                                    backgroundColor: 'pink', // Encabezado en rosa fuerte
                                    color: 'black',
                                    fontSize: '1.2rem',
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

export default VerPQRSD;
