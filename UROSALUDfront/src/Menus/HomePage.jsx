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
            const response = await axios.get('http://localhost:8080/api/Especialidad/get');
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
                <img src="/Logo - Urosalud_20240917_141636_0001.png" alt="Logo" />
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
            <div className="pieHomePage">
                <PiePagina />
            </div>
        </div>
    );
}


