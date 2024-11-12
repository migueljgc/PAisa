import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './paciente.css'
import { AccesoAdmin } from '../../Componentes/Header';
import DataTable from 'react-data-table-component';
import PiePagina from '../../Componentes/PiePagina';

const VerUsuarios = () => {
    const [usuario, setUsuario] = useState([]);
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda

    useEffect(() => {
        const fetchUsuario = async () => {
            const response = await axios.get('http://localhost:8080/api/Usuario/get')
            console.log(response.data)
            setUsuario(response.data);

        }
        fetchUsuario();
    }, [])
    const filtered = usuario.filter(item =>
        (item?.identificacion && item.identificacion.toLowerCase().includes(filterText.toLowerCase())) ||
        (item?.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
        (item?.lastName && item.lastName.toLowerCase().includes(filterText.toLowerCase())) ||
        (item?.tiposIdentificacion?.descripcion && item.tiposIdentificacion.descripcion.toLowerCase().includes(filterText.toLowerCase())) ||
        (item?.email && item.email.toLowerCase().includes(filterText.toLowerCase())) ||
        (item?.direccion && item.direccion.toLowerCase().includes(filterText.toLowerCase())) ||
        (item?.role && item.role.toLowerCase().includes(filterText.toLowerCase()))
    );

    // Definir las columnas de la tabla
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.name
        },
        {
            name: 'Apellido',
            selector: row => row.lastName,
            sortable: true
        },
        {
            name: 'Tipo de Documento',
            selector: row => row.tiposIdentificacion?.descripcion
        },
        {
            name: 'Documento de Identidad',
            selector: row => row.identificacion,
            sortable: true
        },
        {
            name: 'Telefono',
            selector: row => row.number,
            sortable: true
        },
        {
            name: 'Correo',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Direccion',
            selector: row => row.direccion,
            sortable: true
        },
        {
            name: 'Rol',
            selector: row => row.role,
            sortable: true
        },
    ];
    return (
        <div>
            <AccesoAdmin />
            <div className="ver-paciente">

                <div className="tabla-paciente">
                    <div className="head-pqrs">
                        <h2>Listado De Pacientes</h2>
                        <input type="text"
                            placeholder='Buscar'
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)} // Actualiza el estado del texto de búsqueda
                        />
                    </div>
                    <DataTable
                        columns={columns}
                        data={filtered}
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

export default VerUsuarios;
