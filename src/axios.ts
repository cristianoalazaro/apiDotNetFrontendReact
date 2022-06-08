import axios, { HeadersDefaults } from 'axios';

const BASEURL = 'https://localhost:7177'

const getToken = () => {
    return `${localStorage.getItem('token')}`
}
interface CommonHeaderProperties extends HeadersDefaults {
    Authorization: string;
}

axios.defaults.headers.put['content-type'] = 'Application/json';
axios.defaults.headers.post['content-type'] = 'Application/json';
axios.defaults.headers = {
    'Authorization': getToken()
} as CommonHeaderProperties;

export const getProductCount = async () => {
    return await axios.get(`${BASEURL}/produto/qtd`);
}

export const getProducts = async () => {
    return await axios.get(`${BASEURL}/produto`);
}

export const getProductsPagination = async (pageNumber: number, recordsPerPage: number) => {
    return await axios.get(`${BASEURL}/produto/${pageNumber}/${recordsPerPage}`, {
        headers: {
            'Authorization': getToken()
        }
    })
}

export const insertProduct = async (name: string) => {
    try {
        return await axios.post(`${BASEURL}/produto`, { "nome": name }, 
        {
            headers:{
                'Authorization': getToken()
            }
        });
    } catch (error: any) {
        return error.response
    }
}

export const udateProduct = async (id: number, name: string) => {
    try {
        return await axios.put(`${BASEURL}/produto/${id}`, { "nome": name },
        {
            headers:{
                'Authorization': getToken()
            }
        })
    } catch (error: any) {
        return error.response
    }
}

export const deleteProduct = async (id: number) => {
    try {
        return await axios.delete(`${BASEURL}/produto/${id}`,
        {
            headers:{
                'Authorization': getToken()
            }
        })
    } catch (error: any) {
        return error.response
    }
}

export const signIn = async (userName: string, password: string) => {
    try {
        return await axios.post(`${BASEURL}/login/signin`, { "userName": userName, "password": password });
    } catch (error: any) {
        return error.response
    }
}

export const signUp = async (userName: string, password: string) => {
    try {
        return await axios.post(`${BASEURL}/login/signup`, { "userName": userName, "password": password })
    } catch (error: any) {
        return error.response
    }
}