import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AccesoAdmin } from '../../Componentes/Header';
import DataTable from 'react-data-table-component';
import './verPQRSD.css'
import PiePagina from '../../Componentes/PiePagina';

const VerPQRSD = () => {
    const [pqrsd, setPqrsd] = useState([]);

    useEffect(() => {
        const fechtPqrsd = async () => {
            const response = await axios.get('http://localhost:8080/Pqrs/get')
            console.log(pqrsd)
            setPqrsd(response.data)
        }
        fechtPqrsd();
    }, [])

    // Definir las columnas de la tabla
    const columns = [
        {
            name: 'Descripcion',
            selector: row => row.descripcion
        },
        {
            name: 'Fecha',
            selector: row => row.fechaHora,
            sortable: true
        },
        {
            name: 'Tipo de Solicitud',
            selector: row => row.tiposSolicitud?.description
        },

    ];

    return (
        <div>
            <AccesoAdmin />
            <div className="ver-pqrsd">

                <div className="tabla-pqrsd">
                    <h2>Lista De PQRSD</h2>
                    <DataTable
                    columns={columns}
                    data={pqrsd}
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

export default VerPQRSD;
