import React, { useEffect, useState } from "react";
import './Recovery.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PiePagina from "./PiePagina";

export const Recovery = () => {
    const [email, setEmail] = useState('');
    const [isLogged, setIsLogged] = useState('');
    const navigate = useNavigate();

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

    useEffect(() => {
        checkLoginStatus();
        
    }, []); // Solo se ejecuta una vez al montar el componente

    const handleResetRequest = async () => {
        try {
            console.log(email);
            const response = await axios.post('/forgot-password/email', { email });
            alert("Éxito");
            setEmail('')
            return;
        } catch (error) {
            console.error('Error al solicitar restablecimiento de contraseña:', error);
        }
    };

    if (isLogged) {
        return null; // o un spinner si quieres mostrar algo mientras se redirige
    }

    
    return (
        <div className="recovery">
            <div className="logo-recovery">
            <img src="/Logo.PNG" alt="Logo" />
            </div>
            <div className="reco">
                <h2>¿Olvidaste tu contraseña?</h2>
                <label>Para recuperar tu contraseña, ingresa tu Email</label>
                <br/>
                <div className="input-box2">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="btnSolicitar">
                    <button onClick={handleResetRequest}>Solicitar</button>
                </div>
                <div className="PAndA">
                    <p>¿Ya tienes cuenta? <a href="/Login">Inicia Sesión</a></p>
                </div>
            </div>
            <div className="pie">
                <PiePagina />
            </div>
        </div>
    );
}

