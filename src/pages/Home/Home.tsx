import './Home.css';
import * as api from '../../axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../redux/authSlice';
import { userAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import {GenericModal} from '../../components/GenericModal/GenericModal';
import { ForgetPassword } from '../ForgetPassword/ForgetPassword';

export const Home = () => {
    const [userNameSignIn, setUserNameSignIn] = useState<string>('');
    const [passwordSignIn, setPasswordSignIn] = useState<string>('');
    const [userNameSignUp, setUserNameSignUp] = useState<string>('');
    const [userEmailSignUp, setUserEmailSignUp] = useState<string>('')
    const [passwordSignUp, setPasswordSignUp] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showModalForgetPassword, setShowModalForgetPassword] = useState<boolean>(false)

    let message: string = ''
    let errors: string = ''

    //Redux
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const auth = userAppSelector(state => state.auth);

    const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsLoading(true)
            const res = await api.signIn(userNameSignIn, passwordSignIn);

            if (res.data.token !== null && res.data.token !== '' && res.data.token !== undefined) {
                dispatch(setAuth({ user: res.data.user.userName, token: `${res.data.token}` }))
                message = res.data.message
                toast.success(message)
                navigate('/product')
            }
            else {
                errors = res.data.errors
                toast.error(errors)
            }
        } catch {
            toast.error('Ocorreu algum erro')
        }
        setIsLoading(false)
    }

    const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const res = await api.signUp(userNameSignUp, passwordSignUp)
            message = res.data.message
            errors = res.data.errors

            if (message)
                toast.success(message)
            else if (errors)
                toast.error(errors)
        } catch {
            toast.error('Ocorreu algum erro')
        }
        setIsLoading(false)
        setUserNameSignUp('')
        setPasswordSignUp('')
    }

    const showForgetMyPassword = () => {
        setShowModalForgetPassword(true)
    }

    const handleCloseGenericModal = () =>{
        setShowModalForgetPassword(false)
    }

    return (
        <>
            <h4 className="form-title">Faça login</h4>
            {auth &&
                <h3>{auth.user}</h3>
            }

            {isLoading &&
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

            <form className="form" onSubmit={signIn}>
                <div className="mb-3">
                    <input type="text" className="form-control" id="userNameLogin"
                        placeholder='Seu nome'
                        value={userNameSignIn}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserNameSignIn(event.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="passwordLogin"
                        placeholder='sua senha' value={passwordSignIn}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswordSignIn(event.target.value)} 
                        onClick={showForgetMyPassword} />
                </div>
                <a className='forget-my-password' href='#' onClick={showForgetMyPassword}>Esqueci minha senha</a>
                <div className='submit'>
                    <button type="submit" className="btn btn-success">Entrar</button>
                </div>
            </form>

            <h4 className="form-title">Registre-se</h4>
            <form className='form' onSubmit={signUp}>
            <div className="mb-3">
                    <input type="text" className="form-control" id="userNameLogon"
                        placeholder='Seu nome'
                        value={userNameSignUp}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserNameSignUp(event.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" id="userEmailLogon"
                        placeholder='Seu E-mail'
                        value={userEmailSignUp}
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserEmailSignUp(event.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="passwordLogon"
                        placeholder='Sua senha' value={passwordSignUp}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswordSignUp(event.target.value)} />
                </div>
                <div className='submit'>
                    <button type="submit" className="btn btn-success">Entrar</button>
                </div>
            </form>

            {showModalForgetPassword && (
                <GenericModal 
                    title='ESQUECI MINHA SENHA'
                    closeGenericModal = {handleCloseGenericModal}
                    children = {<ForgetPassword />}
                />
            )}
        </>
    )
}