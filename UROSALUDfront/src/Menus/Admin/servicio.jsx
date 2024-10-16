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
            const response = await axios.get('http://localhost:8080/api/Especialidad/get')
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
