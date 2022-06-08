export let token:string = "";

export let isAuthenticated:boolean;

export const getToken = ()=>{
    isAuthenticated = localStorage.getItem('token') !== null ? true : false;
};

export const login = (token:string) =>{
    //localStorage.setItem('token', `Bearer ${token}`);
};
