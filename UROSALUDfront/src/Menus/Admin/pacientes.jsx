import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './paciente.css'
import { AccesoAdmin } from '../../Componentes/Header';
import DataTable from 'react-data-table-component';
import PiePagina from '../../Componentes/PiePagina';

const Pacientes = () => {
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        const fetchUsuario = async () => {
            const response = await axios.get('http://localhost:8080/api/Usuario/get')
            console.log(response.data)
            const filteredData = response.data.filter(item => item.role === 'USER'); // Filtrar los datos por el usuario
            filteredData.forEach(item => {
                item.date = new Date(item.date).toDateString();

            });
            setUsuario(filteredData);

        }
        fetchUsuario();
    }, [])

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
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Direccion',
            selector: row => row.direccion,
            sortable: true
        },
        {
            name: 'Tipo de Identificacion',
            selector: row => row.tiposIdentificacion?.descripcion
        },
        {
            name: 'Identificacion',
            selector: row => row.identificacion,
            sortable: true
        },


    ];
    return (
        <div>
            <AccesoAdmin />
            <div className="ver-paciente">

                <div className="tabla-paciente">
                    <h2>Lista De Pacientes</h2>
                    <DataTable
                        columns={columns}
                        data={usuario}
                        responsive
                        pagination
                        paginationPerPage={6}
                    />
                </div>

            </div>
            <div className="pie">
                <PiePagina />
            </div>
        </div>
    );
}

export default Pacientes;
