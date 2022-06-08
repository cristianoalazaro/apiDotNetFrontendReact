import React, { useState } from 'react';
import {Prod} from '../../Types/Types';
import './ProdutosPagination.css';

type Props = {
    totalRecords:number;
    produtos:Prod[];
    recordsPerPage:number;
    pages:number;
    handleChangePageNumber(value:number): void;
}

export const ProdutosPagination = ({totalRecords, produtos, recordsPerPage, pages, 
                                    handleChangePageNumber}:Props)=>{

    const pagination:number[] = [];
    for (let i:number = 1; i <= pages; i++){
        pagination.push(i);
    };

    const handlePage = (value:number)=>{
        handleChangePageNumber(value);
    }

    return(
        <div className='div-pagination'>
            {pagination.map((_, index)=>(
                <button className='btn-pagination' 
                        key={index} value={index + 1} 
                        onClick={()=>handlePage(index + 1)}>
                            {index + 1}
                </button>
            ))}
        </div>
    )
}