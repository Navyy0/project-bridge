import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Role = ({ role }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="p-5 rounded-md shadow-xl bg-gray-800 border border-gray-700 "
        >
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-400'>
                    {daysAgoFunction(role?.createdAt) === 0 ? "Today" : `${daysAgoFunction(role?.createdAt)} days ago`}
                </p>
            </div>

            <div className='flex items-center gap-4 my-4'>
                <Button className="p-6 bg-gray-800 border-gray-800" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={role?.project?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg text-white'>{role?.project?.name}</h1>
                    <p className='text-sm text-gray-400'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2 text-white'>{role?.title}</h1>
                <p className='text-sm text-gray-300'>{role?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge className={'text-[#FFB300] font-bold'} variant="ghost">{role?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{role?.roleType}</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4 flex-wrap'>
                <Button 
                    onClick={() => navigate(`/description/${role?._id}`)} 
                    variant="outline" 
                    className="w-full sm:w-auto text-white border-[#FFB300] bg-[#FFB300] hover:bg-[#555555] hover:border-[#FFD54F]"
                >
                    Details
                </Button>
            </div>
        </motion.div>
    );
}

export default Role;
