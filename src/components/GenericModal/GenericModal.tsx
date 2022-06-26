import React from "react";
import './GenericModal.css';

interface Props {
    title: string
    closeGenericModal(): void
    children: JSX.Element
}

export const GenericModal = ({ title, closeGenericModal, children }: Props) => {
    return (
        <div className="modal2">
            <div className="modal-item">
                <button className="btn-closed" title= "Fechar" onClick={closeGenericModal}>X</button>
                <h2 className="title">{title}</h2>
                <hr />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>

    )
}