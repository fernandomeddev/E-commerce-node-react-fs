import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3001',
});

export const createSession = async (user_email, user_password) => {
    return api.post('/signin', {user_email, user_password});
};


export const getProducts = async () => {
    return api.get('/products')
};


export const createUser = async (user_name, user_email, user_password, confirmPassword) => {
    return api.post('/signup', {user_name, user_email, user_password, confirmPassword})
                .then(res => {
                    return res;
                })
                .catch((error)=>{
                
                    return JSON.stringify(error);
                })
        
};