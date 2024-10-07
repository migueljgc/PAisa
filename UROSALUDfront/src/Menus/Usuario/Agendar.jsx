import React, { useEffect, useState } from 'react';
import '../Usuario/Agendar.css'
import { Header } from '../../Componentes/Header';
import PiePagina from '../../Componentes/PiePagina';
import axios from 'axios';

const Agendar = () => {
    const [tiposCitas, setTiposCitas] = useState([]);
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const token = localStorage.getItem('token');
    const [doctors, setDoctors] = useState([]);
    const [minDate, setMinDate] = useState('');
    const minTime = '08:00';
    const maxTime = '17:00';
    const [formData, setFormData] = useState({
        TiposCitas: '',
        fecha: '',
        hora: '',
        doctor: '',
    });
    

    useEffect(() => {
        document.title = "Agendar Cita"

        const fetchTiposCitas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/TiposCitas/get'

                );
                console.log('Tipos de identificación obtenidos:', response.data);
                setTiposCitas(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };

       // Hacer la petición para obtener todos los usuarios
       axios.get('/api/Usuario/get')
       .then(response => {
           // Filtrar los usuarios que tienen el rol "doctor"
           const filteredDoctors = response.data.filter(usuario => usuario.role === 'DOCTOR');
           setDoctors(filteredDoctors);
           console.log(doctors)
       })
       .catch(error => console.error('Error fetching users:', error));

        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);

        

        fetchTiposCitas();

    }, []);

    useEffect(() => {
        if (formData.doctor) {
            // Fetch horarios disponibles del doctor seleccionado
            axios.get(`/api/Citas/doctor/${formData.doctor}`)
                .then(response => setHorariosDisponibles(response.data))
                .catch(error => console.error('Error al obtener horarios:', error));
        }
    }, [formData.doctor]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            // Solicitud para obtener el ID del paciente autenticado
            const response1 = await axios.get('http://localhost:8080/api/auth/editar', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        
            if (response1.status === 200) {
                alert('Cita registrada exitosamente.');
                const user = response1.data.id;
                console.log(user);
        
                // Registro de la cita
                const CitaResponse = await axios.post('http://localhost:8080/api/Citas/save', {
                    fecha: formData.fecha,
                    estadosCitas: { id: 1 || '' },
                    doctor: { id: parseInt(formData.doctor, 10) || '' },
                    tiposCitas: { id: parseInt(formData.TiposCitas, 10) || ''},
                    hora: formData.hora,
                    paciente: { id: user || '' }
                });
                
                console.log('usuario', CitaResponse);
            } else {
                console.error('Error al autenticar al usuario');
            }

        } catch (error) {
            console.error('Error al reservar la cita:', error);
        }
       
    };


    return (
        <div className="Agendar">
            <div className="headeragendar">
                <Header />
            </div>
            <div className="agendar">
                <h1>Agendar Cita</h1>
                <form onSubmit={handleSubmit}>
                    <div className="agendarcita" >

                        <div className="datosagendar">
                            <div className="labelsAndInputs">
                            <label>Seleccionar Tipo de Cita</label>
                                <select
                                    id="TiposCitas"
                                    name="TiposCitas"
                                    value={formData.TiposCitas}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione Tipo de Cita</option>
                                    {tiposCitas.map((tipo) => (
                                        <option key={tipo.id} value={tipo.id}>
                                            {tipo.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="labelsAndInputs">
                                <label >Seleccionar Fecha</label>
                                <input className='inputs'
                                    type="date"
                                    id="fecha"
                                    name="fecha"
                                    min={minDate}
                                    value={formData.fecha}
                                    onChange={handleChange} required />
                            </div>
                            <div className="labelsAndInputs">
                            <label>Seleccionar Hora</label>
                                <select
                                    id="hora"
                                    name="hora"
                                    value={formData.hora}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione la Hora</option>
                                    {horariosDisponibles.map(horario => (
                                        <option key={horario.hora} value={horario.hora}>
                                            {horario.hora} (Citas disponibles: {horario.citasDisponibles})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="labelsAndInputs">
                                <label >Seleccionar Doctor Disponible</label>
                                <select className='Selects'
                                    id="doctor"
                                    name="doctor"
                                    value={formData.doctor}
                                    onChange={handleChange} required
                                >
                                    <option key="" value="">Seleccione el Doctor</option>
                                    {doctors.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="btnagendar">
                            <button type='submit'>Enviar</button>
                        </div>

                    </div>
                </form>
            </div>
            <div className="pieagendar">
                <PiePagina />
            </div>
        </div>
    );
}

export default Agendar;
