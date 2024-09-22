import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://bistro-boss-server-five-rho.vercel.app',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOutUser } = useAuth();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        // console.log(config)

        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        const status = error.response.status
        // console.log('Status Error', status);

        if (status == 401 || status == 403) {
            await signOutUser();
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;