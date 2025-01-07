import { setProjects } from '@/redux/projectSlice'
import { PROJECT_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllProjects = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${PROJECT_API_END_POINT}/get`, { withCredentials: true });
                console.log('called');
                if(res.data.success){
                    dispatch(setProjects(res.data.projects));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchProjects();
    },[])
}

export default useGetAllProjects
