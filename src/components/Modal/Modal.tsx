import React from "react";
import './Modal.css';

type Props = {
    modalOperation:string;
    closeModal(): void;
    id:number;
    name:string
    handleChangeName(name:React.ChangeEvent<HTMLInputElement>): void;
    handleInsertUpdateProduct(name:string): void;
}

export const Modal = ({ modalOperation, closeModal, id, name, handleChangeName, handleInsertUpdateProduct }: Props) => {
    const handleCloseModal = () => {
        closeModal();
    }

    const handleSubmitForm = async(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if (!name.trim()) return alert('Digite o nome');
        try{
            handleInsertUpdateProduct(name);
            closeModal();    
        } catch{
        }
    }

    return (
        <div className="modal2">
            <div className="modal-item">
                <button className="btn-closed" title="Fechar" onClick={handleCloseModal}>X</button>
                <h2 className="title">{modalOperation === 'A' ? 'Alterar produto' : 'Adicionar produto'}</h2>
                <hr />
                <div className="content">
                    <form onSubmit={handleSubmitForm}>
                        <div className="mb-3">
                            <label htmlFor="Id" className="form-label">Código</label>
                            <input type="text" className="form-control" id="Id" disabled 
                                   value={id} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="Name">Nome</label>
                            <input type="text" className="form-control" id="Name" 
                                   value={name} maxLength={50} 
                                   onChange={handleChangeName} />
                        </div>
                        <button type="submit" className="btn btn-primary" >Gravar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}