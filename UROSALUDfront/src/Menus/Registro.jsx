import React, { useEffect, useState } from 'react';
import '../Menus/Registro.css'
import PiePagina from '../Componentes/PiePagina';
import axios from 'axios';

const Registro = () => {
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [identificationTypes, setIdentificationTypes] = useState([]);
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
        direccion: ''
    });

    useEffect(() => {
        document.title = "Registro"

        const fetchIdentificationTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/TiposIdentificacion/get');
                console.log('Tipos de identificación obtenidos:', response.data);
                setIdentificationTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };

        const fetchGeneroTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Genero/get');
                console.log('Tipos de generos obtenidos:', response.data);
                setGenerosTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };

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
            direccion: ''
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
            if (formData.contraseña === formData.confirmarContraseña) {
                const userResponse = await axios.post('http://localhost:8080/api/auth/registerUser', {
                    name: formData.nombre,
                    lastName: formData.apellido,
                    email: formData.correo,
                    tiposIdentificacion: { id: selectedIdentificationType.id }, // Enviar el objeto completo
                    identificacion: parseInt(formData.identificacion),
                    password: formData.contraseña,
                    number: parseInt(formData.numero),
                    genero: { id: selectedGenerosType.id },
                    direccion: formData.direccion
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
        <div class="Registro">
            <div class="headerRegistro">
                <img src="/Logo - Urosalud_20240917_141636_0001.png" alt="Logo" />
            </div>
            <div class="registro">
                <form className='formRegistro' onSubmit={handleSubmit}>
                    <h1>
                        Registro
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
                                <label >Cedula</label>
                                <input type="number" 
                                id="identificacion"
                                name="identificacion"
                                value={formData.identificacion}
                                onChange={handleChange} required/>
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
                                <label >Confirmar contraseña</label>
                                <input type="password"
                                    id="confirmarContraseña"
                                    name="confirmarContraseña"
                                    value={formData.confirmarContraseña}
                                    onChange={handleChange} required
                                />
                                {confirmPasswordError && <div className='errore'> {confirmPasswordError}</div>}
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
                                <label >Tipo de identificacion</label>
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
                                <label >Direccion</label>
                                <input type="text" 
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange} required/>
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
                        </div>
                        <div className="btnRegistrar">
                            <button>CREAR CUENTA</button>
                        </div>
                        <div className="A">
                            <a href="/Login">¿Tienes una Cuenta?</a>
                        </div>
                    </div>
                </form>
            </div>
            <div class="pieregistro">
                <PiePagina />
            </div>
        </div>
    );
}

export default Registro;
