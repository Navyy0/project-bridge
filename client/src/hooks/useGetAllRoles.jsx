import { setAllRoles } from '@/redux/roleSlice';
import { ROLE_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllRoles = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((store) => store.role);

    useEffect(() => {
        const fetchAllRoles = async () => {
            try {
                const res = await axios.get(`${ROLE_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setAllRoles(res.data.roles)); // Fixed the typo here
                }
            } catch (error) {
                console.error("Failed to fetch roles:", error); // Improved error logging
            }
        };

        fetchAllRoles();
    }, [dispatch, searchedQuery]); // Added proper dependencies
};

export default useGetAllRoles;
