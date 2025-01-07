import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, ROLE_API_END_POINT } from '@/utils/constant';
import { setSingleRole } from '@/redux/roleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const RoleDescription = () => {
    const { singleRole } = useSelector(store => store.role);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleRole?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const roleId = params.id;
    const dispatch = useDispatch();

    const applyRoleHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${roleId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleRole = { ...singleRole, applications: [...singleRole.applications, { applicant: user?._id }] };
                dispatch(setSingleRole(updatedSingleRole));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        const fetchSingleRole = async () => {
            try {
                const res = await axios.get(`${ROLE_API_END_POINT}/get/${roleId}`, { withCredentials: true });
                if (res.data.success) {
                    console.log('API Response:', res.data.role); // Log API response
                    dispatch(setSingleRole(res.data.role));
                    console.log('Single Role in Redux:', res.data.role);

                    setIsApplied(res.data.role.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log('Error fetching role:', error);
            }
        };
        fetchSingleRole();
    }, [roleId, dispatch, user?._id]);
    
    const roleCreatedAt = singleRole?.createdAt?.split("T")[0]; // safely accessing createdAt

    const getApplyButtonClass = () => {
        return isApplied
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-[#FFB300] hover:bg-[#FFD54F] text-[#222222]';
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#000000] to-[#111111] text-gray-200 min-h-screen p-4 sm:p-8"
        >
            <div className='max-w-7xl mx-auto bg-gray-800 p-4 rounded-sm shadow-md'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-2xl text-white'>{singleRole?.title}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <Badge className={'text-[#FFB300] font-bold'} variant="ghost">{singleRole?.position} Positions</Badge>
                            <Badge className={'text-[#e65050] font-bold'} variant="ghost">{singleRole?.roleType}</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyRoleHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${getApplyButtonClass()}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                <h1 className='border-b-2 border-b-gray-300 font-medium py-4 text-white'>Role Description</h1>

                <div className='my-4'>
                    <h1 className='font-bold my-1 text-white'>Role: <span className='pl-4 font-normal text-gray-300'>{singleRole?.title}</span></h1>
                    <h1 className='font-bold my-1 text-white'>College: <span className='pl-4 font-normal text-gray-300'>{singleRole?.college}</span></h1>
                    <h1 className='font-bold my-1 text-white'>Requirements: <span className='pl-4 font-normal text-gray-300'>{singleRole?.requirements}</span></h1>
                    <h1 className='font-bold my-1 text-white'>Experience: <span className='pl-4 font-normal text-gray-300'>{singleRole?.experienceLevel} Months</span></h1>
                    <h1 className='font-bold my-1 text-white'>Total Applicants: <span className='pl-4 font-normal text-gray-300'>{singleRole?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1 text-white'>Posted Date: <span className='pl-4 font-normal text-gray-300'>{roleCreatedAt}</span></h1>
                </div>
            </div>
        </motion.div>
    );
};

export default RoleDescription;
