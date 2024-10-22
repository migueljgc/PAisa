import React, { useEffect, useState } from 'react';
import { Header, HeaderDoctor, HeaderSecretaria } from '../Componentes/Header';
import PiePagina from '../Componentes/PiePagina';
import '../Menus/HomePage.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importar el ícono de menú

export const HomePage = () => {
    //home
    const [showMenu, setShowMenu] = useState(false);
    const [swiper, setSwiper] = useState([])
    //servicio
    const [servicio, setServicio] = useState([]);
    const [selectedServicio, setSelectedServicio] = useState(null);
    //home
    useEffect(() => {
        document.title = "Inicio"
        fetchSwipers();
    }, []);

    const fetchSwipers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Swiper/get');
            setSwiper(response.data);
            console.log('images ', swiper)
        } catch (error) {
            console.error('Error al obtener especialidades: ', error);
        }
    };
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    //servicio
    useEffect(() => {
        fetchServicio();
    }, []);

    const fetchServicio = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Servicio/get');
            setServicio(response.data);
        } catch (error) {
            console.error('Error al obtener Servicio: ', error);
        }
    };
    const openModal = (servicio) => {
        setSelectedServicio(servicio);
    };

    const closeModal = () => {
        setSelectedServicio(null);
    };
    return (
        <div className='HomePage'>
            <div class="headerHomePage">
                <img src="/Logo - Urosalud_20240917_141636_0001.png" alt="Logo" />
                <li className="servicio-HomePage">
                    <div className="servicio-HomePage-button">
                        <a href="#Servicios" className="servicio-HomePage-link">Servicios</a>
                    </div>
                </li>
                <li className="servicio-HomePage">
                    <div className="servicio-HomePage-button">
                        <a href="#Especialidades" className="servicio-HomePage-link">Especialidades</a>
                    </div>
                </li>
            </div>
            {/* Span para abrir el menú con icono de 3 líneas */}
            <span onClick={toggleMenu} className="menu-icon">
                {showMenu ? <FaTimes size={30} /> : <FaBars size={30} />}
            </span>


            {/* Mostrar el menú Header solo si showMenu es true */}
            {showMenu && (
                <div className="menuHomepage">
                    <Header />
                </div>
            )}
            <div className="homepage">
                <div className="swiper-container">
                    <div className="swiper">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: 40000,  // Tiempo de espera entre los slides (en milisegundos)
                                disableOnInteraction: false  // Permite que el autoplay continúe después de una interacción
                            }}
                        >
                            {swiper.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={`data:image/jpeg;base64,${item.img}`}
                                        alt={item.nombre}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

            </div>
            <div className="ver-servicio-home" id="Servicios">
                <div className="servicio-container">
                    <h2>Nuestros servicios</h2>
                    <p>Contamos con estándares de calidad para brindarle a nuestros usuarios un excelente servicio.</p>
                    <div className="servicio-grid">
                        {servicio.map((servicio, index) => (
                            <div key={index} className="servicio-card" onClick={() => openModal(servicio)}>
                                <img
                                    src={`data:image/jpeg;base64,${servicio.img}`}
                                    alt={servicio.nombre}
                                    className="servicio-imagen"
                                />
                                <h3 className="servicio-nombre">{servicio.nombre}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Modal */}
                    {selectedServicio && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModal}>&times;</span>
                                <h2>{selectedServicio.nombre}</h2>
                                <img
                                    src={`data:image/jpeg;base64,${selectedServicio.img}`}
                                    alt={selectedServicio.nombre}
                                    className="modal-imagen"
                                />
                                <p>{selectedServicio.descripcion}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="pieHomePage">
                <PiePagina />
            </div>
        </div>
    );
}


export const HomePageDoctor = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [swiper, setSwiper] = useState([])
    useEffect(() => {
        fetchSwipers();
    }, []);

    const fetchSwipers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Swiper/get');
            setSwiper(response.data);
            console.log('images ', swiper)
        } catch (error) {
            console.error('Error al obtener especialidades: ', error);
        }
    };
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <div className='HomePage'>
            <div class="headerHomePage">
                <img src="/Logo - Urosalud_20240917_141636_0001.png" alt="Logo" />
            </div>
            {/* Span para abrir el menú con icono de 3 líneas */}
            <span onClick={toggleMenu} className="menu-icon">
                {showMenu ? <FaTimes size={30} /> : <FaBars size={30} />}
            </span>


            {/* Mostrar el menú Header solo si showMenu es true */}
            {showMenu && (
                <div className="headerHomepage">
                    <HeaderDoctor />
                </div>
            )}
            <div className="homepage">
                <div className="swiper-container">
                    <div className="swiper">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: 3000,  // Tiempo de espera entre los slides (en milisegundos)
                                disableOnInteraction: false  // Permite que el autoplay continúe después de una interacción
                            }}
                        >
                            {swiper.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={`data:image/jpeg;base64,${item.img}`}
                                        alt={item.nombre}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className="pieHomePage">
                <PiePagina />
            </div>
        </div>
    );
}

export const HomePageSecretaria = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [swiper, setSwiper] = useState([])
    useEffect(() => {
        fetchSwipers();
    }, []);

    const fetchSwipers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Swiper/get');
            setSwiper(response.data);
            console.log('images ', swiper)
        } catch (error) {
            console.error('Error al obtener especialidades: ', error);
        }
    };
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <div className='HomePage'>
            <div class="headerHomePage">
                <img src="/Logo_-_Urosalud_20240917_141636_0000.png" alt="Logo" />
            </div>
            {/* Span para abrir el menú con icono de 3 líneas */}
            <span onClick={toggleMenu} className="menu-icon">
                {showMenu ? <FaTimes size={30} /> : <FaBars size={30} />}
            </span>


            {/* Mostrar el menú Header solo si showMenu es true */}
            {showMenu && (
                <div className="menuHomepage">
                    <HeaderSecretaria />
                </div>
            )}

            <div className="homepage-secre">
                <div className="swiper-container-admin">
                    <div className="swiper">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={2}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: 3000,  // Tiempo de espera entre los slides (en milisegundos)
                                disableOnInteraction: false  // Permite que el autoplay continúe después de una interacción
                            }}
                        >
                            {swiper.map((item, index) => (
                                <SwiperSlide className='SwiperSlide' key={index}>
                                    <img
                                        src={`data:image/jpeg;base64,${item.img}`}
                                        alt={item.nombre}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

            </div>
            <div className="ver-conocenos-secre">
                <div className="conocenos-content-secre">
                    <p>
                        En Urosalud, nos dedicamos a ofrecer soluciones innovadoras y personalizadas para la salud urológica.
                        Nuestro equipo médico experto está comprometido con la excelencia y el bienestar de nuestros pacientes.
                    </p>
                </div>
            </div>
            <div className="pieHomePage">
                <PiePagina />
            </div>
        </div>
    );
}


export const HomePageInicio = () => {
    //home

    const [swiper, setSwiper] = useState([])
    //servicio
    const [servicio, setServicio] = useState([]);
    const [selectedServicio, setSelectedServicio] = useState(null);
    //especialistas
    const [especialistas, setEspecialistas] = useState([]);

    //home
    useEffect(() => {
        document.title = "Inicio"
        fetchSwipers();
    }, []);

    const fetchSwipers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Swiper/get');
            setSwiper(response.data);
            console.log('images ', swiper)
        } catch (error) {
            console.error('Error al obtener especialidades: ', error);
        }
    };

    //servicio
    useEffect(() => {
        fetchServicio();
        fetchEspecialistas();
    }, []);

    const fetchServicio = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Servicio/get');
            setServicio(response.data);
        } catch (error) {
            console.error('Error al obtener Servicio: ', error);
        }
    };

    //especialistas
    const fetchEspecialistas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Usuario/get'); // Asegúrate de que esta ruta es correcta
            const usuariosFiltrados = response.data.filter(user => user.especialidad.nombre !== 'NA');
            setEspecialistas(usuariosFiltrados);
            console.log('especialista ', especialistas)
        } catch (error) {
            console.error('Error al obtener los especialistas: ', error);
        }
    };
    const openModal = (servicio) => {
        setSelectedServicio(servicio);
    };

    const closeModal = () => {
        setSelectedServicio(null);
    };
    return (
        <div className='HomePage'>

            <div class="headerHomePage">
                <img src="/Logo_-_Urosalud_20240917_141636_0000.png" alt="Logo" />
                <li className="servicio-HomePage">
                    <div className="servicio-HomePage-button">
                        <a href="#Servicios" className="servicio-HomePage-link">Servicios</a>
                    </div>
                </li>
                <li className="servicio-HomePage">
                    <div className="servicio-HomePage-button">
                        <a href="#Conocenos" className="servicio-HomePage-link">Conocenos</a>
                    </div>
                </li>
                <li className="servicio-HomePage">
                    <div className="servicio-HomePage-button">
                        <a href="#Especialistas" className="servicio-HomePage-link">Especialistas</a>
                    </div>
                </li>
                <li className="servicio-HomePage">
                    <div className="servicio-HomePage-button">
                        <a href="/Registro" className="servicio-HomePage-link">Registrarse</a>
                    </div>
                </li>
                <li className="servicio-HomePage">
                    <div className="servicio-HomePage-button">
                        <a href="/Login" className="servicio-HomePage-link">Iniciar Sesion</a>
                    </div>
                </li>
            </div>
            <div className="texto-inicio">
                <h2>Bienvenido a Urosalud</h2>
            </div>


            <div className="homepage">
                <div className="swiper-container">
                    <div className="swiper">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={2}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: 40000,  // Tiempo de espera entre los slides (en milisegundos)
                                disableOnInteraction: false  // Permite que el autoplay continúe después de una interacción
                            }}
                        >
                            {swiper.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={`data:image/jpeg;base64,${item.img}`}
                                        alt={item.nombre}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

            </div>
            <div className="ver-servicio-home" id="Servicios">
                <div className="servicio-container">
                    <h2>Nuestros servicios</h2>
                    <p>Contamos con estándares de calidad para brindarle a nuestros usuarios un excelente servicio.</p>
                    <div className="servicio-grid">
                        {servicio.map((servicio, index) => (
                            <div key={index} className="servicio-card" onClick={() => openModal(servicio)}>
                                <img
                                    src={`data:image/jpeg;base64,${servicio.img}`}
                                    alt={servicio.nombre}
                                    className="servicio-imagen"
                                />
                                <h3 className="servicio-nombre">{servicio.nombre}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Modal */}
                    {selectedServicio && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModal}>&times;</span>
                                <h2>{selectedServicio.nombre}</h2>
                                <img
                                    src={`data:image/jpeg;base64,${selectedServicio.img}`}
                                    alt={selectedServicio.nombre}
                                    className="modal-imagen"
                                />
                                <p>{selectedServicio.descripcion}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="ver-conocenos" id='Conocenos'>
                <h1 className="conocenos-title">CONÓCENOS ...</h1>
                <div className="conocenos-content">
                    <div className="mision">
                        <h2>Misión</h2>
                        <p>
                            Proporcionar atención urológica integral y de alta calidad,
                            enfocándonos en el diagnóstico, tratamiento y prevención de enfermedades del sistema urinario
                            y reproductor masculino. Promover la salud y el bienestar de nuestros pacientes a través de la educación,
                            la innovación y el uso de tecnología avanzada.
                        </p>
                    </div>
                    <div className="vision">
                        <h2>Visión</h2>
                        <p>
                            Ser un referente en el campo de la urología, reconocido por nuestra excelencia en la atención al paciente,
                            la investigación y la formación de profesionales. Aspiramos a liderar en la mejora de la salud urológica
                            a nivel comunitario y nacional, promoviendo el acceso equitativo a tratamientos efectivos y oportunos.
                        </p>
                    </div>
                </div>

            </div>
            <div className="ver-especialistas" id="Especialistas">
                <div className="especialistas-container">
                    <h2>Nuestros Especialistas</h2>
                    <div className="especialistas-grid">
                        {especialistas.map((especialista, index) => {
                            // Determinar la imagen de perfil según el género
                            let profileImage;
                            if (especialista.genero.descricion === 'masculino') {
                                profileImage = '/Profile1.jpg'; // Imagen para hombres
                            } else if (especialista.genero.descricion === 'femenino') {
                                profileImage = '/Profile2.jpg'; // Imagen para mujeres
                            } else {
                                profileImage = '/Profile3.jpg'; // Imagen para otros géneros
                            }

                            return (
                                <div key={index} className="especialista-card">
                                    <img src={profileImage} alt={`Perfil de ${especialista.name}`} />
                                    <h3 className="especialista-nombre">{especialista.name} {especialista.lastName}</h3>
                                    <p>Especialista en {especialista.especialidad.nombre}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="pieHomePage">
                <PiePagina />
            </div>
        </div>
    );
}