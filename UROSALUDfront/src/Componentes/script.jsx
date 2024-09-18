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
          <a href="/EditarPerfilAdmin">
            Editar usuario
          </a>

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
    localStorage.setItem('logget', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify(''));

  };
  return (


    <div className="dropdown-content">
      <div className="App">
        <div className="arriba">
          {user && <p>Bienvenido, {user}!</p>}
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
          <a href="/EditarPerfilSecre">
            Editar usuario
          </a>

        </div>
      </div>

    </div>


  );
};

