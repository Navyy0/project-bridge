import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import axios from 'axios';
import { ROLE_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostRole = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    college: '',
    roleType: '',
    experience: '',
    position: 0,
    projectId: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { projects } = useSelector((store) => store.project);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedProject = projects.find(
      (project) => project.name.toLowerCase() === value
    );
    setInput({ ...input, projectId: selectedProject._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${ROLE_API_END_POINT}/post`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/roles');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5 px-4 mt-[80px]">
  <form
    onSubmit={submitHandler}
    className="p-8 max-w-4xl border border-gray-700 shadow-lg rounded-md bg-gray-800 w-full"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label className="text-gray-400">Title</Label>
        <Input
          type="text"
          name="title"
          value={input.title}
          onChange={changeEventHandler}
          className="my-1 bg-gray-700 text-gray-200 border-gray-600 focus:ring-[#FFB300]"
        />
      </div>
      <div>
        <Label className="text-gray-400">Description</Label>
        <Input
          type="text"
          name="description"
          value={input.description}
          onChange={changeEventHandler}
          className="my-1 bg-gray-700 text-gray-200 border-gray-600 focus:ring-[#FFB300]"
        />
      </div>
      <div>
        <Label className="text-gray-400">Requirements</Label>
        <Input
          type="text"
          name="requirements"
          value={input.requirements}
          onChange={changeEventHandler}
          className="my-1 bg-gray-700 text-gray-200 border-gray-600 focus:ring-[#FFB300]"
        />
      </div>
      <div>
        <Label className="text-gray-400">College</Label>
        <Input
          type="text"
          name="college"
          value={input.college}
          onChange={changeEventHandler}
          className="my-1 bg-gray-700 text-gray-200 border-gray-600 focus:ring-[#FFB300]"
        />
      </div>
      <div>
        <Label className="text-gray-400">Role Type</Label>
        <Input
          type="text"
          name="roleType"
          value={input.roleType}
          onChange={changeEventHandler}
          className="my-1 bg-gray-700 text-gray-200 border-gray-600 focus:ring-[#FFB300]"
        />
      </div>
      <div>
        <Label className="text-gray-400">Experience Level (in Months)</Label>
        <Input
          type="text"
          name="experience"
          value={input.experience}
          onChange={changeEventHandler}
          className="my-1 bg-gray-700 text-gray-200 border-gray-600 focus:ring-[#FFB300]"
        />
      </div>
      <div>
        <Label className="text-gray-400">No of Positions</Label>
        <Input
          type="number"
          name="position"
          value={input.position}
          onChange={changeEventHandler}
          className="my-1 bg-gray-700 text-gray-200 border-gray-600 focus:ring-[#FFB300]"
        />
      </div>
      {projects.length > 0 && (
        <div>
          <Label className="text-gray-400">Project</Label>
          <Select onValueChange={selectChangeHandler}>
            <SelectTrigger className="w-full bg-gray-700 text-gray-200 border-gray-600 focus:ring-[#FFB300]">
              <SelectValue placeholder="Select a Project" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-gray-200">
              <SelectGroup>
                {projects.map((project) => (
                  <SelectItem
                    key={project._id}
                    value={project.name.toLowerCase()}
                    className="hover:bg-gray-600"
                  >
                    {project.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
    {loading ? (
      <Button className="w-full my-4 bg-[#FFB300] hover:bg-[#FFD54F] text-[#222222]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
      </Button>
    ) : (
      <Button type="submit" className="w-full my-4 bg-[#FFB300] hover:bg-[#FFD54F] text-[#222222]">
        Post New Role
      </Button>
    )}
    {projects.length === 0 && (
      <p className="text-xs text-red-600 font-bold text-center my-3">
        *Please register a project first, before posting a role
      </p>
    )}
  </form>
</div>
    </div>
  );
};

export default PostRole;
