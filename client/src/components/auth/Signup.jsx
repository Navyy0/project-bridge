import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        character: '',
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const profilePictureHandler = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));

            // Creating form data
            const formData = new FormData();
            Object.keys(input).forEach((key) => formData.append(key, input[key]));
            if (profilePicture) {
                formData.append('file', profilePicture);
            }

            const res = await axios.post(`${USER_API_END_POINT}/signup`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <>
            <Navbar />
            <motion.div
                className="flex justify-center items-center min-h-screen pt-16 bg-gradient-to-r from-[#000000] to-[#222222]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="w-full max-w-sm p-6 bg-gray-800 mt-[30px] shadow-lg rounded-lg border border-gray-200 text-white"
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    <motion.h1
                        className="font-bold text-2xl mb-4 text-[#FFB300] rounded-md text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Sign Up
                    </motion.h1>

                    <form onSubmit={submitHandler}>
                        {/* Full Name */}
                        <motion.div className="mb-3" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                            <Label htmlFor="fullname" className="block text-sm">
                                Full Name <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="fullname"
                                placeholder="John Doe"
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="text-white bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            />
                        </motion.div>

                        {/* Email */}
                        <motion.div className="mb-3" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                            <Label htmlFor="email" className="block text-sm">
                                Email Address <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="email"
                                placeholder="john.doe@gmail.com"
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="text-white bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            />
                        </motion.div>

                        {/* Phone Number */}
                        <motion.div className="mb-3" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                            <Label htmlFor="phoneNumber" className="block text-sm">
                                Phone Number <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="phoneNumber"
                                placeholder="+1234567890"
                                type="tel"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="text-white bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            />
                        </motion.div>

                        {/* Password */}
                        <motion.div className="mb-3" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
                            <Label htmlFor="password" className="block text-sm">
                                Password <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                id="password"
                                placeholder="********"
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                className="text-white bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            />
                        </motion.div>

                        {/* Profile Picture */}
                        <motion.div className="mb-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
                            <Label htmlFor="profilePicture" className="block text-sm">
                                Profile Picture
                            </Label>
                            <Input
                                id="profilePicture"
                                type="file"
                                accept="image/*"
                                onChange={profilePictureHandler}
                                className="text-white bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            />
                        </motion.div>

                        {/* Role */}
                        <motion.div className="mb-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
                            <Label className="block text-sm mb-2">
                                I am a: <span className="text-red-400">*</span>
                            </Label>
                            <RadioGroup className="flex gap-3" value={input.character} onValueChange={(value) => setInput({ ...input, character: value })}>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="character"
                                        value="student"
                                        id="student"
                                        className="cursor-pointer"
                                        checked={input.character === 'student'}
                                        onChange={changeEventHandler}
                                    />
                                    <Label htmlFor="student" className="cursor-pointer">
                                        Seeker
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="character"
                                        value="recruiter"
                                        id="recruiter"
                                        className="cursor-pointer"
                                        checked={input.character === 'recruiter'}
                                        onChange={changeEventHandler}
                                    />
                                    <Label htmlFor="recruiter" className="cursor-pointer">
                                        Recruiter
                                    </Label>
                                </div>
                            </RadioGroup>
                        </motion.div>

                        {/* Submit Button */}
                        {loading ? (
                            <Button className="w-full my-2 bg-yellow-500 text-white hover:bg-yellow-600 transition-all">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </Button>
                        ) : (
                            <Button className="w-full bg-yellow-500 text-white hover:bg-yellow-600 transition-all" type="submit">
                                Sign Up
                            </Button>
                        )}

                        <p className="mt-4 text-center text-sm">
                            Already have an account?
                            <Link to="/login" className="text-yellow-500 mx-1">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Signup;
