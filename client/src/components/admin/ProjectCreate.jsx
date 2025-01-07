import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PROJECT_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleProject } from '@/redux/projectSlice';

const ProjectCreate = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch();

  const registerNewProject = async () => {
    if (!projectName.trim()) {
      toast.error('Project name is required');
      return;
    }
    try {
      const res = await axios.post(
        `${PROJECT_API_END_POINT}/register`,
        { projectName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleProject(res.data.project));
        toast.success(res.data.message);
        const projectId = res?.data?.project?._id;
        navigate(`/admin/projects/${projectId}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 mt-[80px] bg-gray-800 rounded-md">
  <div className="my-10">
    <h1 className="font-bold text-2xl text-[#FFB300]">Your Project Name</h1>
    <p className="text-gray-400">
      What would you like to give your project name? You can change this later.
    </p>
  </div>

  <div className="mb-4">
    <Label htmlFor="projectName" className="text-[#FFB300]">Project Name</Label>
    <Input
      id="projectName"
      type="text"
      className="my-2 w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
      placeholder="JobHunt, Microsoft etc."
      value={projectName}
      onChange={(e) => setProjectName(e.target.value)}
    />
  </div>

  <div className="flex flex-wrap items-center gap-2 my-10">
    <Button
      variant="outline"
      className="border-[#FFB300] text-[#FFB300] hover:bg-[#FFB300] hover:text-[#222222]"
      onClick={() => navigate('/admin/projects')}
    >
      Cancel
    </Button>
    <Button
      className="bg-[#FFB300] hover:bg-[#FFD54F] text-[#222222] border-[#FFB300]"
      onClick={registerNewProject}
    >
      Continue
    </Button>
  </div>
</div>

    </div>
  );
};

export default ProjectCreate;
