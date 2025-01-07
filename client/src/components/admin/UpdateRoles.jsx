import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { ROLE_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../shared/Footer';

const UpdateRoles = () => {
    const { id: roleId } = useParams();

    const navigate = useNavigate();
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
    const [projects, setProjects] = useState([]);

    // Fetch role details
    useEffect(() => {
        const fetchRoleDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${ROLE_API_END_POINT}/get/${roleId}`);
                setInput(response.data.role);
            } catch (error) {
                toast.error('Failed to fetch role details. Please try again.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoleDetails();
    }, [roleId]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        setInput({ ...input, projectId: value });
    };

    // Handle form submission for updating the role
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("Input Data:", input);
            await axios.put(`${ROLE_API_END_POINT}/update/${roleId}`, input, {
                headers: {
                    "Content-Type": "application/json", // Add Bearer token to headers
                },
                withCredentials: true,
            });

            toast.success('Role updated successfully!');
            navigate('/admin/roles'); // Redirect to roles list page
        } catch (error) {
            toast.error('Failed to update the role. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <motion.div
                className="flex items-center mt-[50px] justify-center w-full py-10 bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222] px-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <form
                    onSubmit={submitHandler}
                    className="p-6 sm:p-8 max-w-4xl w-full border border-gray-700 shadow-lg bg-gray-800 rounded-md"
                >
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Input fields */}
                        {Object.entries(input).map(([key, value]) => (
                            key !== 'projectId' && (
                                <div key={key}>
                                    <Label className="text-white">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type={typeof value === 'number' ? 'number' : 'text'}
                                        name={key}
                                        value={value}
                                        onChange={changeEventHandler}
                                        className="my-1 border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-700 text-white"
                                    />
                                </div>
                            )
                        ))}
                        {projects.length > 0 && (
                            <div>
                                <Label className="text-white">
                                    Project <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    onValueChange={selectChangeHandler}
                                    defaultValue={input.projectId || ''}
                                >
                                    <SelectTrigger className="w-full border-gray-600 bg-gray-700 text-white">
                                        <SelectValue placeholder="Select a Project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {projects.map((project) => (
                                                <SelectItem
                                                    key={project._id}
                                                    value={project._id}
                                                    className="text-gray-900"
                                                >
                                                    {project.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </motion.div>
                    {loading ? (
                        <Button className="w-full my-4 bg-yellow-500 text-gray-900">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full my-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 transition duration-300"
                        >
                            Update Role
                        </Button>
                    )}
                    {projects.length === 0 && (
                        <p className="text-sm text-red-600 font-bold text-center my-3">
                            *Please register a project first, before updating roles.
                        </p>
                    )}
                </form>
            </motion.div>
            <Footer />
        </div>
    );
};

export default UpdateRoles;
