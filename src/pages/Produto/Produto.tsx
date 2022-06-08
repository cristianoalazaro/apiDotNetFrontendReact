import axios from "axios";
import React, { useEffect, useState } from "react"
import * as api from '../../axios';
import './produto.css';
import { Modal } from '../../components/Modal/Modal';
import { ProdutosPagination } from '../../components/ProdutosPagination/ProdutosPagination';
import { Prod } from '../../Types/Types';
import { toast } from "react-toastify";

export const Produto = () => {
    const [produtos, setProdutos] = useState<Prod[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [modalOperation, setModalOperation] = useState<string>('');
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pages, setPages] = useState<number>(0);

    let message: string = ''
    let errors: string = ''

    useEffect(() => {
        const getProductCount = async () => {
            const res = await api.getProductCount();
            //setTotalRecords(res.data);
            handleSetTotalRecords();
        };
        getProductCount();
        getProdutos();
    }, []);

    useEffect(() => {
        getProdutos();
        handlePages();
    }, [totalRecords, pageNumber]);

    const getProdutos = async () => {
        const prods = await api.getProductsPagination(pageNumber, recordsPerPage);
        const data = prods.data;
        setProdutos(data);
        handlePages();
    }

    const handleSetTotalRecords = async () => {
        const res = await api.getProductCount();
        setTotalRecords(res.data);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        getProdutos();
        setModalOperation('');
        handleSetTotalRecords();
    }

    const handleInserir = () => {
        setModalOperation('I');
        setId(0);
        setName('');
        setShowModal(true);
        //getProdutos();
    }

    const handleAlterar = (id: number, name: string) => {
        setModalOperation('A');
        setName(name);
        setId(id);
        setShowModal(true);
    }

    const handlechangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleInsertUpdateProduct = async (name: string) => {
        if (modalOperation == 'A') {
            try {
                const res = await api.udateProduct(id, name);

                if (!res.data.errors) {
                    message = res.data.message
                    toast.success(message)
                } else {
                    errors = res.data.errors
                    toast.error(errors)
                }
            } catch {
                toast.error('Ocorreu algum erro!')
            }
        } else if (modalOperation == 'I') {
            try {
                const res = await api.insertProduct(name);
                if (!res.data.errors) {
                    message = res.data.message
                    toast.success(message)
                } else {
                    errors = res.data.errors
                    toast.error(errors)
                }
            } catch {
                toast.error('Ocorreu algum erro!')
            }
        }
        handlePages();
    }

    const handleExcluir = async (id: number) => {
        const result: boolean = window.confirm(`Deseja realmente excluir o Produto ${id}`);
        if (result) {
            try {
                const res = await api.deleteProduct(id);
                message = res.data.message

                if (!res.data.errors)
                    toast.success(message)
                else
                    toast.error(errors)

                getProdutos();
            } catch  {
                toast.error('Algum erro ocorreu!')
            }
        }
        handleSetTotalRecords();
        handleChangePageNumber(1);
    };

    const handleChangePageNumber = (value: number) => {
        setPageNumber(value);
    }

    const handlePages = () => {
        setPages(totalRecords ? Math.ceil(totalRecords / recordsPerPage) : 1);
    }

    return (
        <>
            <h2 className="page-title">PÁGINA DE PRODUTOS</h2>
            <h4>Total de produtos: {totalRecords}</h4>
            <button className="btn btn-secondary" onClick={handleInserir}>Adicionar produto</button>

            {pages > 0 &&
                <ProdutosPagination
                    totalRecords={totalRecords}
                    produtos={produtos}
                    recordsPerPage={recordsPerPage}
                    pages={pages}
                    handleChangePageNumber={handleChangePageNumber} />
            }

            {!produtos.length &&
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>Código</td>
                        <td>Nome</td>
                        <td>Operações</td>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(item => (
                        <>
                            <tr key={item.id}>
                                <td width={150}>{item.id}</td>
                                <td width={450}>{item.nome}</td>
                                <td>
                                    <button className="btn btn-success"
                                        onClick={() => handleAlterar(item.id, item.nome)}>Alterar</button>
                                    <button className="btn btn-danger"
                                        onClick={() => handleExcluir(item.id)}>Excluir</button>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>

            {showModal &&
                <Modal
                    modalOperation={modalOperation}
                    closeModal={handleCloseModal}
                    id={id}
                    name={name}
                    handleChangeName={handlechangeName}
                    handleInsertUpdateProduct={handleInsertUpdateProduct}
                />
            }
        </>
    )
}