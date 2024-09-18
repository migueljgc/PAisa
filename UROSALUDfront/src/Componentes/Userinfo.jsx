import React, { useState } from 'react';
import { Script, ScriptSecre, ScriptUser } from './script';
import '../componentes/Userinfo.css'
import { FaUser } from "react-icons/fa";


export const UserinfoAmin = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="user-info">
                {/*<img src='/images/iconprofile.png' alt="Foto de perfil" className="profile-picture" width="35%" height="40%" onClick={() => setIsOpen((prev) => !prev)} />
                */}
                <FaUser className="profile-picture" onClick={() => setIsOpen((prev) => !prev)} />
            </div>
            {isOpen && (<Script />)
            }
        </div>
    );
}
export const UserinfoUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="user-info">
                {/*<img src='/images/iconprofile.png' alt="Foto de perfil" className="profile-picture" width="35%" height="40%" onClick={() => setIsOpen((prev) => !prev)} />
                */}
                <FaUser className="profile-picture" onClick={() => setIsOpen((prev) => !prev)} />
            </div>
            {isOpen && (<ScriptUser />)
            }
        </div>
    );
}
export const UserinfoSecre = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="user-info">
                {/*<img src='/images/iconprofile.png' alt="Foto de perfil" className="profile-picture" width="35%" height="40%" onClick={() => setIsOpen((prev) => !prev)} />
                */}
                <FaUser className="profile-picture" onClick={() => setIsOpen((prev) => !prev)} />
            </div>
            {isOpen && (<ScriptSecre />)
            }
        </div>
    );
}

