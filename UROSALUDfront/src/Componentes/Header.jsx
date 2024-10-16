import React, { useEffect, useState } from 'react';
import '../Componentes/Header.css'
import { ImExit } from 'react-icons/im';
import { RxDashboard } from 'react-icons/rx';
import { FaBars, FaTimes } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

export const Header = () => {
  const handleLogout = () => {
    localStorage.setItem('logget', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify(''));
  };
  useEffect(() => {
    const listElements = document.querySelectorAll('.list__button--click');

    listElements.forEach((listElement) => {
      listElement.addEventListener('click', () => {
        listElement.classList.toggle('arrow');

        let height = 0;
        const menu = listElement.nextElementSibling;
        if (menu.clientHeight === 0) {
          height = menu.scrollHeight;
        }

        menu.style.height = `${height}px`;
      });
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      listElements.forEach((listElement) => {
        listElement.removeEventListener('click', () => { });
      });
    };
  }, []);
  return (
    <div>
      <nav className="nav">
        <ul className="list">

          <li className="list__item">
            <div className="list__button">
              <img src="assets/dashboard.svg" className="list__img" />
              <a href="/HomePage" className="nav__link">Inicio</a>
            </div>
          </li>

          <li className="list__item">
            <div className="list__button">
              <CgProfile />
              <a href="#" className="nav__link">Perfil</a>
            </div>
          </li>

          <li className="list__item list__item--click">
            <div className="list__button list__button--click">
              <RxDashboard />
              <a href="#" className="nav__link">Gestion Citas</a>
              <img src="assets/arrow.svg" className="list__arrow" />
            </div>

            <ul className="list__show">
              <li className="list__inside">
                <a href="#" className="nav__link nav__link--inside">Ver Citas</a>
              </li>

              <li className="list__inside">
                <a href="/Agendar" className="nav__link nav__link--inside">Agendar Cita</a>
              </li>
            </ul>

          </li>

          <li className="list__item">
            <div className="list__button">
              <ImExit />
              <a href="/Login" className="nav__link" onClick={handleLogout}>Cerrar sesion</a>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  );
}



export const HeaderDoctor = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    localStorage.setItem('logget', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify(''));
  };
  useEffect(() => {
    const listElements = document.querySelectorAll('.list__button--click');

    listElements.forEach((listElement) => {
      listElement.addEventListener('click', () => {
        listElement.classList.toggle('arrow');

        let height = 0;
        const menu = listElement.nextElementSibling;
        if (menu.clientHeight === 0) {
          height = menu.scrollHeight;
        }

        menu.style.height = `${height}px`;
      });
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      listElements.forEach((listElement) => {
        listElement.removeEventListener('click', () => { });
      });
    };
  }, []);
  return (
    <div>
      <nav className="nav">
        <ul className="list">

          <li className="list__item">
            <div className="list__button">
              <a href="/HomePageDoctor" className="nav__link">Inicio</a>
            </div>
          </li>

          <li className="list__item">
            <div className="list__button">
              <a href="#" className="nav__link">Mis Citas</a>
            </div>
          </li>


          <li className="list__item">
            <div className="list__button">
              <a href="#" className="nav__link">Mis Pacientes</a>
            </div>
          </li>

          <li className="list__item">
            <div className="list__button">
              <a href="/Login" className="nav__link" onClick={handleLogout}>Cerrar sesion</a>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  );
}


export const HeaderSecretaria = ({ closeMenu }) => {
  const handleLogout = () => {
    localStorage.setItem('logget', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify(''));
  };
  useEffect(() => {
    const listElements = document.querySelectorAll('.list__button--click');

    listElements.forEach((listElement) => {
      listElement.addEventListener('click', () => {
        listElement.classList.toggle('arrow');

        let height = 0;
        const menu = listElement.nextElementSibling;
        if (menu.clientHeight === 0) {
          height = menu.scrollHeight;
        }

        menu.style.height = `${height}px`;
      });
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      listElements.forEach((listElement) => {
        listElement.removeEventListener('click', () => { });
      });
    };
  }, []);

  return (
    <div>

      <nav className="nav">
        {/* Icono de "X" para cerrar el menú */}

        <ul className="list">

          <li className="list__item">
            <div className="list__button">
              <a href="/HomePagesAdmin" className="nav__link">Inicio</a>
            </div>
          </li>

          <li className="list__item list__item--click">
            <div className="list__button list__button--click">

              <a href="#" className="nav__link">Gestion Servicios</a>
              <img src="assets/arrow.svg" className="list__arrow" />
            </div>

            <ul className="list__show">
              <li className="list__inside">
                <a href="/ver-servicios" className="nav__link nav__link--inside">Ver Servicios</a>
              </li>

              <li className="list__inside">
                <a href="/CrearServicio" className="nav__link nav__link--inside">Crear Servicios</a>
              </li>
            </ul>

          </li>
          <li className="list__item list__item--click">
            <div className="list__button list__button--click">

              <a href="#" className="nav__link">Gestion Swiper</a>
              <img src="assets/arrow.svg" className="list__arrow" />
            </div>

            <ul className="list__show">
              <li className="list__inside">
                <a href="#" className="nav__link nav__link--inside">Ver Swipers</a>
              </li>

              <li className="list__inside">
                <a href="/crear-swiper" className="nav__link nav__link--inside">Crear Swiper</a>
              </li>
            </ul>

          </li>

          <li className="list__item">
            <div className="list__button">
              <a href="/ver-pacientes" className="nav__link">Lista de Pacientes</a>
            </div>
          </li>

          <li className="list__item">
            <div className="list__button">
              <a href="ver-pqrsd" className="nav__link">Ver PQRSD</a>
            </div>
          </li>

          <li className="list__item">
            <div className="list__button">
              <a href="/Login" className="nav__link" onClick={handleLogout}>Cerrar sesion</a>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  );
}


export const Acceso = () => {
  return (
    <div class="headerHomePage">
      <img src="/Logo - Urosalud_20240917_141636_0001.png" alt="Logo" />

    </div>
  )
}
export const AccesoAdmin = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
};
  return (
    <div className="">
      <div className="headerHomePage">
        <img src="/Logo - Urosalud_20240917_141636_0001.png" alt="Logo" />

      </div>
      <span onClick={toggleMenu} className="menu-icon">
                {showMenu ? <FaTimes size={30} /> : <FaBars size={30} />}
            </span>


            {/* Mostrar el menú Header solo si showMenu es true */}
            {showMenu && (
                <div className="menu">
                    <HeaderSecretaria />
                </div>
            )}
    </div>

  )
}