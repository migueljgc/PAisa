import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export const Activate = () => {
    const { token } = useParams();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState('');

    const checkLoginStatus = () => {
        const logged = localStorage.getItem('loggetUROSALUD') === 'true';
        setIsLogged(logged);
        console.log('loggetUROSALUD: ', logged);
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
        const verifyEmail = async () => {
            try {
                const response = await axios.get('/api/auth/verify-email', {
                    params: { token }
                });
                if (response.status === 200) {
                    setError('Correo electrónico verificado correctamente.');
                    alert(error)

                } else {
                    setError(`Error al verificar correo electrónico: ${response.data} .`);
                    alert(error)
                    return;
                }
                setTimeout(() => {
                    navigate('/')
                    
                  }, "5000");
                  
                return;

            } catch (error) {
                console.error('Error verifying email:', error);
                setError('Error al verificar correo electrónico');
                alert(error)
                return;

            }
        };

        verifyEmail();
    }, [token]);
    if (isLogged) {
        return null; //o un spinner si quieres mostrar algo mientras se redirige
    }

   

    return (
        <div>
           <div className="activate">
                <p style={{ color: 'black' }}>Verificando correo electrónico...</p>
            </div>
            
        </div>
    );
};
