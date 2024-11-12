import { useEffect, useState } from 'react';
import './script.css'



export const Script = () => {
  const [user, setUser] = useState(localStorage.getItem('users'));

  useEffect(() => {
    // Actualizar el estado del usuario cuando cambie el valor en localStorage
    setUser(localStorage.getItem('users'));
  }, []);

  return (


    <div className="dropdown-content">
      <div className="App">
        <div className="arriba">
          {user && <p>Bienvenido, {user}!</p>}

        </div>
        <div className="abajo">
        <li>
            <img src="assets/perfil.svg" className="list__img" onClick={() => navigate('/perfil-user')} />
            <a href="/perfil-doctor" className="nav__link">Perfil</a>

          </li>

        </div>
      </div>

    </div>


  );
};

//_______________________________________________________________________________________________________________
export const ScriptUser = () => {
  const [user, setUser] = useState(localStorage.getItem('users'));

  useEffect(() => {
    // Actualizar el estado del usuario cuando cambie el valor en localStorage
    setUser(localStorage.getItem('users'));
  }, []);
  const handleLogout = () => {
    localStorage.setItem('loggetUROSALUD', 'false');
    localStorage.setItem('tokenUROSALUD', '');
    localStorage.setItem('userUROSALUD', JSON.stringify(''));

  };
  return (


    <div className="dropdown-content">
      <div className="App">
        <div className="arriba">
          {user && <p>Bienvenido, {user}!</p>}
        </div>
        <div className="abajo">
          <li>
            <img src="assets/perfil.svg" className="list__img" onClick={() => navigate('/perfil-user')} />
            <a href="/perfil-user" className="nav__link">Perfil</a>

          </li>
        </div>
        <div className="abajo">
          <a href="/Login" onClick={handleLogout}>
              Salir</a>
        </div>

      </div>

    </div>


  );
};

//_________________________________________________________________________________________________________________
export const ScriptSecre = () => {
  const [user, setUser] = useState(localStorage.getItem('users'));

  useEffect(() => {
    // Actualizar el estado del usuario cuando cambie el valor en localStorage
    setUser(localStorage.getItem('users'));
  }, []);

  return (


    <div className="dropdown-content">
      <div className="App">
        <div className="arriba">
          {user && <p>Bienvenido, {user}!</p>}

        </div>
        <div className="abajo">
        <li>
            <img src="assets/perfil.svg" className="list__img" onClick={() => navigate('/perfil-user')} />
            <a href="/perfil-admin" className="nav__link">Perfil</a>

          </li>

        </div>
      </div>

    </div>



  );
};

