import React, { useEffect } from 'react';
import '../Componentes/Header.css'
import { ImExit } from 'react-icons/im';
import { RxDashboard } from 'react-icons/rx';

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
      <nav class="nav">
        <ul class="list">

          <li class="list__item">
            <div class="list__button">
              <img src="assets/dashboard.svg" class="list__img" />
              <a href="/HomePage" class="nav__link">Inicio</a>
            </div>
          </li>
          <li class="list__item list__item--click">
            <div class="list__button list__button--click">
              <RxDashboard />
              <a href="#" class="nav__link">Gestion Citas</a>
              <img src="assets/arrow.svg" class="list__arrow" />
            </div>

            <ul class="list__show">
              <li class="list__inside">
                <a href="#" class="nav__link nav__link--inside">Ver Citas</a>
              </li>

              <li class="list__inside">
                <a href="/Agendar" class="nav__link nav__link--inside">Agendar Cita</a>
              </li>
            </ul>

          </li>

          <li class="list__item">
            <div class="list__button">
              <a href="#" class="nav__link">Servicios</a>
            </div>
          </li>


          <li class="list__item">
            <div class="list__button">
              <a href="#" class="nav__link">Especialistas</a>
            </div>
          </li>

          <li class="list__item">
            <div class="list__button">
              <ImExit />
              <a href="/Login" class="nav__link" onClick={handleLogout}>Cerrar sesion</a>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  );
}



export const HeaderDoctor = () => {
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
      <nav class="nav">
        <ul class="list">

          <li class="list__item">
            <div class="list__button">
              <a href="/HomePageDoctor" class="nav__link">Inicio</a>
            </div>
          </li>

          <li class="list__item">
            <div class="list__button">
              <a href="#" class="nav__link">Mis Citas</a>
            </div>
          </li>


          <li class="list__item">
            <div class="list__button">
              <a href="#" class="nav__link">Mis Pacientes</a>
            </div>
          </li>

          <li class="list__item">
            <div class="list__button">
              <a href="/Login" class="nav__link" onClick={handleLogout}>Cerrar sesion</a>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  );
}


export const HeaderSecretaria = () => {
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
      <nav class="nav">
        <ul class="list">

          <li class="list__item">
            <div class="list__button">
              <a href="/HomePageSecretaria" class="nav__link">Inicio</a>
            </div>
          </li>

          <li class="list__item">
            <div class="list__button">
              <a href="#" class="nav__link">Citas</a>
            </div>
          </li>


          <li class="list__item">
            <div class="list__button">
              <a href="#" class="nav__link">Lista de Pacientes</a>
            </div>
          </li>

          <li class="list__item">
            <div class="list__button">
              <a href="#" class="nav__link">Ver PQRSD</a>
            </div>
          </li>

          <li class="list__item">
            <div class="list__button">
              <a href="/Login" class="nav__link" onClick={handleLogout}>Cerrar sesion</a>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  );
}
