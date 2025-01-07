import { setAllAdminRoles } from '@/redux/roleSlice'
import { ROLE_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminRoles = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminRoles = async () => {
            try {
                const res = await axios.get(`${ROLE_API_END_POINT}/getadminroles`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAdminRoles(res.data.roles));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminRoles();
    },[])
}

export default useGetAllAdminRoles