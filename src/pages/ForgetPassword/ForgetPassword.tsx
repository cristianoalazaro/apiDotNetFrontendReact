import React, { useState } from "react"
import { toast } from 'react-toastify';
import * as api from '../../axios'
import './ForgetPassword.css'

export const ForgetPassword = () => {
    const [email, setEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    let message: string = ''
    let errors: string = ''

    const changeMyPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email)
            try {
                setIsLoading(true)
                const res = await api.sendMailForgotMyPassword(email)
                message = res.data.message
                errors = res.data.errors
                if (message)
                    toast.success(message)
                else if (errors)
                    toast.error(errors)

            } catch {
                toast.error('Ocorreu algum erro')
            } finally{
                setIsLoading(false)

                setTimeout(()=>{
                    window.location.href = '/'
                },3000)
            }
    }

    return (
        <>
            <h6>Digite seu e-mail para alterar sua senha</h6>

            <form className="form" onSubmit={changeMyPassword}>
                <div className="mb-3">
                    <input type="email" className="form-control" id="email"
                        placeholder='Seu e-mail'
                        value={email}
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        autoComplete='off' />
                </div>
                <div className='submit'>
                    <button type="submit" className="btn btn-success">Solicitar Redefinição de Senha</button>
                </div>
            </form>

            {isLoading &&
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </>
    )
}