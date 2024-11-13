import React, { useEffect, useState } from 'react';
import { AccesoAdmin } from '../../Componentes/Header';
import PiePagina from '../../Componentes/PiePagina';
import axios from 'axios';
import './crearUsuario.css'

const CrearUsuario = () => {
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [identificationTypes, setIdentificationTypes] = useState([]);
    const [especialidadesTypes, setEspecialidadesTypes] = useState([]);
    const [generosTypes, setGenerosTypes] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        numero: '',
        contraseña: '',
        confirmarContraseña: '',
        tipoIdentificacion: '',
        identificacion: '',
        genero: '',
        especialidad: '',
        direccion: '',
        rol: ''
    });
    useEffect(() => {
        document.title = "Crear Usuario"

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
                console.error('Error al obtener tipos de generos de la base de datos', error);
            }
        };
        const fetchEspecialidadesTypes = async () => {
            try {
                const response = await axios.get('/api/Especialidad/get');
                console.log('Tipos de especialidades obtenidos:', response.data);
                setEspecialidadesTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de especialidades de la base de datos', error);
            }
        };

        fetchEspecialidadesTypes();
        fetchIdentificationTypes();
        fetchGeneroTypes();
    }, []);

    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerrCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password);

        return minLength && hasUpperCase && hasNumber && hasSpecialChar && hasLowerrCase;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            numero: '',
            contraseña: '',
            confirmarContraseña: '',
            tipoIdentificacion: '',
            identificacion: '',
            genero: '',
            especialidad: '',
            direccion: '',
            rol: ''
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidPassword = validatePassword(formData.contraseña);
        if (!isValidPassword) {
            setPasswordError('La contraseña debe tener mínimo 8 caracteres, al menos un número, un signo y una letra mayúscula.');
            return;
        } else {
            setPasswordError('Contraseña valida');
        }

        if (formData.contraseña !== formData.confirmarContraseña) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            return;
        } else {
            setConfirmPasswordError('Contraseña valida');
        }


        try {
            console.log('Datos del formulario a enviar:', formData);

            const selectedIdentificationType = identificationTypes.find(type => type.id === parseInt(formData.tipoIdentificacion));
            const selectedGenerosType = generosTypes.find(type => type.id === parseInt(formData.genero));
            const selectedEspecialidadType = especialidadesTypes.find(type => type.id === parseInt(formData.especialidad));
            if (formData.contraseña === formData.confirmarContraseña) {
                const userResponse = await axios.post('/api/auth/register', {
                    name: formData.nombre,
                    lastName: formData.apellido,
                    email: formData.correo,
                    tiposIdentificacion: { id: selectedIdentificationType.id }, // Enviar el objeto completo
                    identificacion: parseInt(formData.identificacion),
                    password: formData.contraseña,
                    number: parseInt(formData.numero),
                    genero: { id: selectedGenerosType.id },
                    direccion: formData.direccion,
                    role: formData.rol,
                    especialidad: {id: parseInt(formData.especialidad)}
                });
                alert('Usuario Registrado');
                console.log('Respuesta al guardar usuario:', userResponse.data);
                console.log('Usuario registrado correctamente');
                setConfirmPasswordError('')
                setPasswordError('')
                handleReset();

            }
            else {
                alert('Contraseñas no coinciden')
            }

        } catch (error) {
            console.error('Error al guardar información en la base de datos', error);
        }

    };
    return (
        <div>
            <AccesoAdmin />
            <div class="registro-usuario">
                <form className='formRegistro' onSubmit={handleSubmit}>
                    <div className="datos-registros">
                        <h1>
                            Crear Usuario
                        </h1>
                        <div class="Registros">
                            <div class="registro1">
                                <div className="labelsAndInputs">
                                    <label >Nombre</label>
                                    <input type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange} required />
                                </div>
                                <div className="labelsAndInputs">
                                    <label >Tipo de Documento</label>
                                    <select className='Selects'
                                        id="tipoIdentificacion"
                                        name="tipoIdentificacion"
                                        value={formData.tipoIdentificacion}
                                        onChange={handleChange} required
                                    >
                                        <option key="" value="">Seleccione Tipo de Identificación</option>
                                        {identificationTypes.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="labelsAndInputs">
                                    <label >Correo</label>
                                    <input type="email"
                                        id="correo"
                                        name="correo"
                                        value={formData.correo}
                                        onChange={handleChange} required />
                                </div>
                                <div className="labelsAndInputs">
                                    <label >Genero</label>
                                    <select className='Selects'
                                        id="genero"
                                        name="genero"
                                        value={formData.genero}
                                        onChange={handleChange} required
                                    >
                                        <option key="" value="">Seleccione el Genero</option>
                                        {generosTypes.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.descricion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="labelsAndInputs">
                                    <label >Contraseña</label>
                                    <input type="password"
                                        id="contraseña"
                                        name="contraseña"
                                        value={formData.contraseña}
                                        onChange={handleChange} required
                                    />
                                    {passwordError && <div className='errore'> {passwordError}</div>}
                                </div>
                                <div className="labelsAndInputs">
                                    <label >Rol</label>
                                    <select className='Selects'
                                        id="rol"
                                        name="rol"
                                        value={formData.rol}
                                        onChange={handleChange} required
                                    >
                                        <option key="" value="">Seleccione el rol</option>
                                        <option key="DOCTOR" value="DOCTOR">DOCTOR</option>
                                        <option key="SECRETARIA" value="SECRETARIA">SECRETARIA</option>
                                    </select>
                                </div>
                            </div>
                            <div class="registro2">
                                <div className="labelsAndInputs">
                                    <label >Apellido</label>
                                    <input type="text"
                                        id="apellido"
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleChange} required />
                                </div>
                                <div className="labelsAndInputs">
                                    <label >Numero Documento</label>
                                    <input type="number"
                                        id="identificacion"
                                        name="identificacion"
                                        value={formData.identificacion}
                                        onChange={handleChange} required />
                                </div>
                                <div className="labelsAndInputs">
                                    <label >Telefono</label>
                                    <input type="number"
                                        id="numero"
                                        name="numero"
                                        value={formData.numero}
                                        onChange={handleChange} required />
                                </div>
                                <div className="labelsAndInputs">
                                    <label >Direccion</label>
                                    <input type="text"
                                        id="direccion"
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleChange} required />
                                </div>
                                <div className="labelsAndInputs">
                                    <label >Confirmar contraseña</label>
                                    <input type="password"
                                        id="confirmarContraseña"
                                        name="confirmarContraseña"
                                        value={formData.confirmarContraseña}
                                        onChange={handleChange} required
                                    />
                                    {confirmPasswordError && <div className='errore'> {confirmPasswordError}</div>}
                                </div>
                                {/* Mostrar especialidad solo si el rol es DOCTOR */}
                                {formData.rol === 'DOCTOR' && (
                                    <div className="labelsAndInputs">
                                        <label>Especialidad</label>
                                        <select
                                            className="Selects"
                                            id="especialidad"
                                            name="especialidad"
                                            value={formData.especialidad}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Seleccione Especialidad</option>
                                            {especialidadesTypes.map((type) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.descripcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="btnRegistrar">
                            <button>CREAR CUENTA</button>
                        </div>
                    </div>

                </form>
            </div>
            <div className="pie">
                <PiePagina />
            </div>
        </div>
    );
}

export default CrearUsuario;
