import React, { useEffect, useState } from 'react';
import './Perfil.css';
import { UserinfoUser } from './Userinfo';
import PiePagina from './PiePagina';
import axios from 'axios';
import { AccesoAdmin, AccesoDoc } from './Header';

export const Perfil = () => {
    const [identificationTypes, setIdentificationTypes] = useState([]);
    const [generosTypes, setGenerosTypes] = useState([]);
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        email: '',
        genero: {id:'', descricion: '' },
        password: '',
        identificacion: '',
        number: '',
        direccion: '',
        tiposIdentificacion: { id:'', descripcion: '' },
        img: '',
        role: '',
        id: ''
    });
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const fetchUserAndOptions = async () => {
        try {
            const token = localStorage.getItem('tokenUROSALUD');
            const headers = { 'Authorization': `Bearer ${token}` };

            const userResponse = await axios.get('/api/auth/buscar', { headers });
            setUser(userResponse.data);
            setEditedUser(userResponse.data); // Inicializa el modal con los datos del usuario
        } catch (error) {
            console.error('Error fetching user data', error);
        }
    };

    useEffect(() => {
        const fetchIdentificationTypes = async () => {
            try {
                const response = await axios.get('/api/TiposIdentificacion/get');
                console.log('Tipos de identificación obtenidos:', response.data);
                setIdentificationTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };

        const fetchGeneroTypes = async () => {
            try {
                const response = await axios.get('/api/Genero/get');
                console.log('Tipos de generos obtenidos:', response.data);
                setGenerosTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };

        fetchIdentificationTypes();
        fetchGeneroTypes();
        fetchUserAndOptions();
    }, []);

    const profileImage = user.img
        ? `data:image/jpeg;base64,${user.img}`
        : user.genero.descricion === 'masculino'
            ? '/Profile1.jpg'
            : '/Profile2.jpg';

    const renderHeader = () => {
        if (user.role === 'DOCTOR') {
            return <AccesoDoc />;
        } else if (user.role === 'SECRETARIA') {
            return <AccesoAdmin />;
        } else {
            return (
                <div className="headerHomePage">
                    <img src="/Logo.PNG" alt="Logo" />
                    <li className="servicio-HomePage">
                        <div className="servicio-HomePage-button">
                            <a href="/Agendar" className="servicio-HomePage-link">Agendar Cita</a>
                            <a href="/citas" className="servicio-HomePage-link">Ver Cita</a>
                        </div>
                    </li>
                    <div className="Userinfo">
                        <UserinfoUser />
                    </div>
                </div>
            );
        }
    };

    const openEditModal = () => {
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleEditSubmit = async () => {
        try {
            console.log(editedUser)
            const respondse= await axios.put('/api/Usuario/perfil/update', editedUser);
            setUser(editedUser);
            console.log(respondse)
            alert('exito')
            closeEditModal();
        } catch (error) {
            console.error('Error updating user data', error);
        }
    };

    return (
        <div>
            {renderHeader()}
            <div className="perfil">
                <div className="Perfil">
                    <img src={profileImage} alt="Foto de perfil" className='perfil-imagen' />
                    <p>Hola, {user.name}</p>
                </div>
                <div className="info-perfil">
                    <div className="info-perfil1">
                        <div className="labelsAndInputs-perfil">
                            <label>Nombre</label>
                            <input type="text"
                                id="nombre"
                                name="nombre"
                                value={user.name || ''}
                                disabled />
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Tipo de Documento</label>
                            <input className='Selects'
                                id="tipoIdentificacion"
                                name="tipoIdentificacion"
                                value={user.tiposIdentificacion.descripcion || ''}
                                disabled />
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Correo</label>
                            <input type="email"
                                id="correo"
                                name="correo"
                                value={user.email || ''}
                                disabled />
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Género</label>
                            <input className='Selects'
                                id="genero"
                                name="genero"
                                value={user.genero.descricion || ''}
                                disabled />
                        </div>

                    </div>
                    <div className="info-perfil2">
                        <div className="labelsAndInputs-perfil">
                            <label>Apellido</label>
                            <input type="text"
                                id="apellido"
                                name="apellido"
                                value={user.lastName || ''}
                                disabled />
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Número Documento</label>
                            <input type="text"
                                id="identificacion"
                                name="identificacion"
                                value={user.identificacion || ''}
                                disabled />
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Teléfono</label>
                            <input type="text"
                                id="numero"
                                name="numero"
                                value={user.number || ''}
                                disabled />
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Dirección</label>
                            <input type="text"
                                id="direccion"
                                name="direccion"
                                value={user.direccion || ''}
                                disabled />
                        </div>
                    </div>
                </div>
                <div className="btnPerfil">
                    <button onClick={openEditModal}>Editar</button>
                </div>
            </div>
            <div className="pieHomePage">
                <PiePagina />
            </div>

            {/* Modal de edición */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Editar Perfil</h3>
                        <div className="labelsAndInputs-perfil">
                            <label>Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={editedUser.name}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Apellido</label>
                            <input
                                type="text"
                                name="lastName"
                                value={editedUser.lastName}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Correo</label>
                            <input
                                type="email"
                                name="email"
                                value={editedUser.email}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Tipo de Documento</label>
                            <select
                                id="tipoIdentificacion"
                                name="tipoIdentificacion"
                                value={editedUser.tiposIdentificacion.id || ''}
                                onChange={(e) =>
                                    setEditedUser((prevUser) => ({
                                        ...prevUser,
                                        tiposIdentificacion: {
                                            id: e.target.value,
                                            descripcion: identificationTypes.find(
                                                (type) => type.id === e.target.value
                                            ),
                                        },
                                    }))
                                }
                            >
                                {identificationTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.descripcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Número Documento</label>
                            <input
                                type="text"
                                id="identificacion"
                                name="identificacion"
                                value={editedUser.identificacion}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Género</label>
                            <select
                                id="genero"
                                name="genero"
                                value={editedUser.genero.id}
                                onChange={(e) =>
                                    setEditedUser((prevUser) => ({
                                        ...prevUser,
                                        genero: {
                                            id: e.target.value,
                                            descricion: generosTypes.find(
                                                (gen) => gen.id === e.target.value
                                            ),
                                        },
                                    }))
                                }
                            >
                                {generosTypes.map((gen) => (
                                    <option key={gen.id} value={gen.id}>
                                        {gen.descricion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Teléfono</label>
                            <input
                                type="text"
                                id="numero"
                                name="numero"
                                value={editedUser.number}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className="labelsAndInputs-perfil">
                            <label>Dirección</label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={editedUser.direccion}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className="btnPerfil-modal">
                            <button onClick={handleEditSubmit}>Guardar Cambios</button>
                            <button onClick={closeEditModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
