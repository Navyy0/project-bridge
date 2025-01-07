import { setSingleProject } from '@/redux/projectSlice'
import { setAllRoles } from '@/redux/roleSlice'
import { PROJECT_API_END_POINT, ROLE_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetProjectById = (projectId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleProject = async () => {
            try {
                const res = await axios.get(`${PROJECT_API_END_POINT}/get/${projectId}`,{withCredentials:true});
                console.log(res.data.project);
                if(res.data.success){
                    dispatch(setSingleProject(res.data.project));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleProject();
    },[projectId, dispatch])
}

export default useGetProjectById
