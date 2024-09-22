// import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic';
const useMenu = () => {
    // const [items, setItems] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch('https://bistro-boss-server-five-rho.vercel.app/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setItems(data)
    //             setLoading(false)
    //         })
    // }, [])
    const axiosPublic = useAxiosPublic();

    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() => {
            const res = await axiosPublic.get('/menu');
            return res.data;
        } })

    return [menu, loading, refetch];
};

export default useMenu;