import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import ProjectsTable from './ProjectsTable'
import { useNavigate } from 'react-router-dom'
import useGetAllProjects from '@/hooks/useGetAllProjects'
import { useDispatch } from 'react-redux'
import { setSearchProjectByText } from '@/redux/projectSlice'

const Projects = () => {
    useGetAllProjects();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchProjectByText(input));
    },[input]);
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 mt-[80px] bg-gray-800 rounded-md p-4'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/projects/create")}>New Project</Button>
                </div>
                <ProjectsTable/>
            </div>
        </div>
    )
}

export default Projects
