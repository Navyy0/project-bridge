import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        character: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-[42px]">
                <form onSubmit={submitHandler} className="w-full max-w-md mx-auto border border-gray-600 rounded-md p-6 my-10 bg-gray-800">
                    <h1 className="font-bold text-xl mb-6 text-[#FFB300]">Login</h1>
                    
                    <div className="space-y-4">
                        <div>
                            <Label className="text-gray-300">Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="navyansh@gmail.com"
                                className="mt-1 bg-gray-700 text-white placeholder-gray-400 border border-gray-600"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-300">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="********"
                                className="mt-1 bg-gray-700 text-white placeholder-gray-400 border border-gray-600"
                            />
                        </div>
                    </div>

                    <RadioGroup className="flex items-center gap-4 my-6 text-gray-300">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="character"
                                value="student"
                                checked={input.character === 'student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer text-[#FFB300]"
                            />
                            <Label htmlFor="r1" className="text-gray-300">Seeker</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="character"
                                value="recruiter"
                                checked={input.character === 'recruiter'}
                                onChange={changeEventHandler}
                                className="cursor-pointer text-[#FFB300]"
                            />
                            <Label htmlFor="r2" className="text-gray-300">Recruiter</Label>
                        </div>
                    </RadioGroup>

                    {loading ? (
                        <Button className="w-full my-4 bg-[#FFB300] text-[#222222] hover:bg-[#FFD54F]">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-[#FFB300] text-[#222222] hover:bg-[#FFD54F]">
                            Login
                        </Button>
                    )}

                    <div className="mt-6 text-center">
                        <span className="text-sm text-gray-300">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-[#FFB300]">
                                Signup
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login