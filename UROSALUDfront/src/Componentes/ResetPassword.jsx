import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPassword.css'
import PiePagina from './PiePagina'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const ResetPassword = () => {
    const { token } = useParams(); // obtener el token de la URL
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogged, setIsLogged] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


    // Cargar el archivo Gradient.js
    useEffect(() => {
        checkLoginStatus();

    }, []); // Solo se ejecuta una vez al montar el componente

    const checkLoginStatus = () => {
        const logged = localStorage.getItem('loggetUROSALUD') === 'true';
        setIsLogged(logged);
        console.log('LoggetUROSALUD: ', logged);
        if (logged) {
            const userData = JSON.parse(localStorage.getItem('userUROSALUD'));
            if (userData) {
                const { role } = userData;
                if (role === 'DOCTOR') {
                    navigate('/HomePagesDoctor');
                } else if (role === 'USER') {
                    navigate('/citas');
                } else if (role === 'SECRETARIA') {
                    navigate('/HomePagesAdmin');
                }
            }
        }

    };
    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerrCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password);

        return minLength && hasUpperCase && hasNumber && hasSpecialChar && hasLowerrCase;
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const isValidPassword = validatePassword(newPassword);
        if (!isValidPassword) {
            setError('La contraseña debe tener mínimo 8 caracteres, al menos un número, un signo y una letra mayúscula.');
            return;
        } else {
            setError('Contraseña valida.');

        }

        if (newPassword !== confirmPassword) {
            setErrors('Las contraseñas no coinciden.');
            return;
        }
        else {
            setError('Contraseña valida.');

        }

        try {
            axios.post(`forgot-password/reset/${token}`, { newPassword });
            setError('Contraseña actualizada.');
            alert('exito')
            navigate('/login')


        } catch (error) {
            setError('Error al restablecer contraseña:');

        }
    };
    if (isLogged) {
        return null; // o un spinner si quieres mostrar algo mientras se redirige
    }


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const confirmTogglePasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className='ResetPassword'>
            <div className="logo-ResetPassword">
                <img src="/Logo.PNG" alt="Logo" />
            </div>
            <div className="reset">
                <form onSubmit={handleResetPassword}>
                    <h2>Restablecer Contraseña</h2>
                    <div className="passwordReset">
                        <label htmlFor="">Contraseña: </label>
                        <div className="passwordRegistro">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Ingrese la nueva contraseña"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <span
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                            </span>
                            {error && <div className='errores'> {error}</div>}
                        </div>
                    </div>

                    <div className="passwordReset">
                        <label htmlFor="">Confirmar Contraseña: </label>
                        <div className="passwordRegistro">
                            <input
                                type={confirmPasswordVisible ? 'text' : 'password'}

                                placeholder="Confirme la nueva contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span
                                onClick={confirmTogglePasswordVisibility}
                            >
                                {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {errors && <div className='errores'> {errors}</div>}
                    </div>
                    <div className="btnConfirPassw">
                        <button type='submit'>Restablecer contraseña</button>
                    </div>

                </form>
            </div>
            <div className="pie">
                <PiePagina />
            </div>
        </div>
    );
};

