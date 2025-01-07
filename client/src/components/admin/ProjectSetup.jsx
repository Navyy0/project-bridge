import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { PROJECT_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetProjectById from '@/hooks/useGetProjectById';

const ProjectSetup = () => {
  const params = useParams();
  useGetProjectById(params.id);
  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    college: '',
    file: null,
  });
  const { singleProject } = useSelector((store) => store.project);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation for logo field
    if (!input.file) {
      toast.error('Please attach a logo before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('college', input.college);
    if (input.file) {
      formData.append('file', input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${PROJECT_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/projects');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleProject.name || '',
      description: singleProject.description || '',
      website: singleProject.website || '',
      college: singleProject.college || '',
      file: singleProject.file || null,
    });
  }, [singleProject]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 px-4 mt-[80px] bg-gray-800 rounded-md">
        <form onSubmit={submitHandler}>
          <div className="flex flex-wrap items-center gap-5 p-4">
            <Button
              onClick={() => navigate('/admin/projects')}
              variant="outline"
              className="flex items-center gap-2 text-gray-400 hover:text-white font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl text-[#FFB300]">Project Setup</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            <div>
              <Label className="text-gray-400">Project Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="w-full text-gray-900 bg-gray-700 border-gray-600 focus:ring-[#FFB300]"
              />
            </div>
            <div>
              <Label className="text-gray-400">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="w-full text-gray-900 bg-gray-700 border-gray-600 focus:ring-[#FFB300]"
              />
            </div>
            <div>
              <Label className="text-gray-400">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="w-full text-gray-900 bg-gray-700 border-gray-600 focus:ring-[#FFB300]"
              />
            </div>
            <div>
              <Label className="text-gray-400">College</Label>
              <Input
                type="text"
                name="college"
                value={input.college}
                onChange={changeEventHandler}
                className="w-full text-gray-900 bg-gray-700 border-gray-600 focus:ring-[#FFB300]"
              />
            </div>
            <div>
              <Label className="text-gray-400">Logo</Label><span className="text-red-400">*</span>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full text-gray-900 bg-gray-700 border-gray-600 focus:ring-[#FFB300]"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4 bg-[#FFB300] hover:bg-[#FFD54F] text-[#222222]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#FFB300] hover:bg-[#FFD54F] text-[#222222]"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProjectSetup;
