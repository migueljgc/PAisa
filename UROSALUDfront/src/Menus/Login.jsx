import React, { useEffect, useState } from 'react';
import '../Menus/Login.css'
import PiePagina from '../Componentes/PiePagina';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [identificacion, setidentificacion] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState('');

    useEffect(() => {
        document.title = "Login"
        checkLoginStatus();
    }, []);
    const checkLoginStatus = () => {
        const logged = localStorage.getItem('logget') === 'true';
        setIsLogged(logged);
        console.log('Logget: ', logged);
        if (logged) {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                const { role } = userData;
                if (role === 'DOCTOR') {
                    navigate('/HomePagesDoctor');
                } else if (role === 'USER') {
                    navigate('/HomePages');
                } else if (role === 'SECRETARIA') {
                    navigate('/HomePagesAdmin');
                }
            }
        }

    };
    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', {
                identificacion,
                password,
            });
            console.log(response)
            if (response.status === 200) {
                const responseData = response.data;
                console.log(responseData)

                const { token, authorities } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify({ identificacion, role: authorities[0] })); // Assuming single role
                const response1 = await axios.get('http://localhost:8080/api/auth/editar', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const stateUser = response1.data.stateUser;
                console.log(stateUser)
                if (stateUser === 'INACTIVO') {
                    alert('Usuario Inactivo');
                    return;
                }
                
                if (authorities.includes('DOCTOR')) {
                    window.location.href = '/HomePagesDoctor';
                    localStorage.setItem('logget', true);
                } else if (authorities.includes('USER')) {
                    window.location.href = '/HomePages';
                    localStorage.setItem('logget', true);
                }  else if (authorities.includes('SECRETARIA')) {
                    window.location.href = '/HomePagesAdmin';
                    localStorage.setItem('logget', true);
                }else {

                    window.location.href = '/';

                }

            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al obtener los datos de la base de datos:', error);
            alert('Credenciales incorrectas');
        }

    }
    if (isLogged) {
        return null; // o un spinner si quieres mostrar algo mientras se redirige
    }

    return (
        <div className="Login">
            <div className="logologin">
                <img src="/Logo_-_Urosalud_20240917_141636_0000.png" alt="Logo" />
            </div>
            <div className="iniciologin">
                <form className='formLogin' onSubmit={onLogin}>
                    <h1>Bienvenido</h1>
                    <div className="datosform">
                        <div className="formGroup">
                            <label >Cedula</label><br />
                            <input type="text" id="user" value={identificacion} onChange={e => setidentificacion
                                (e.target.value)} required placeholder='Ingrese su cedula' />
                        </div>

                        <div className="formGroup">
                            <label >Contraseña</label><br />
                            <input  type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder='Ingrese su contraseña' />
                        </div>

                        <a href="/Recuperacion">¿Haz olvidado tu contraseña?</a>

                        <div className="btnlogin">
                            <button type="submit">Inicia sesion</button>
                        </div>



                        <div className="labelandA">
                            <label>¿No tienes cuenta?</label>
                            <a href="/Registro">Registrate</a>
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

export default Login;
