import { useState } from 'react';
import { userAppSelector } from '../../../redux/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../../redux/authSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Header.css'

export const Header = () => {
    const [showUserModal, setShowUserModal] = useState(false)

    const dispatch = useDispatch();
    
    const auth = useSelector(state => state.auth)

    const navigate = useNavigate()

    const handleSignOut = () => {
        dispatch(setAuth({ user: '', token: '' }))
        localStorage.removeItem('token');
        navigate('/')
    }

    return (
        <>
            {showUserModal &&
                <p>modal</p>
            }
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="javascript:void(0)">Logo</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to='/'><a className="nav-link" href="javascript:void(0)">Home</a></Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/product'><a className="nav-link" href="javascript:void(0)">Produto</a></Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/about'><a className="nav-link" href="javascript:void(0)">Sobre</a></Link>
                            </li>
                            {auth.user &&
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="javascript:void(0)" onClick={handleSignOut}>Sair</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link user-name" href="javascript:void(0)" >{auth.user}</a>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <hr />
        </>

    )
}