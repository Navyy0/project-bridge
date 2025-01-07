import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LatestRoleCards = ({ role }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => navigate(`/description/${role._id}`)}
            className="p-5 rounded-lg shadow-md bg-gray-800 border border-gray-800 cursor-pointer hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <h1 className="font-semibold text-lg text-gray-200">{role?.project?.name}</h1>
                <p className="text-sm text-gray-400">India</p>
            </div>
            <div>
                <h1 className="font-bold text-xl my-2 text-white">{role?.title}</h1>
                <p className="text-sm text-gray-400">{role?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Badge className="text-yellow-400 bg-transparent border border-yellow-400 font-bold" variant="ghost">
                    {role?.position} Positions
                </Badge>
                <Badge className="text-red-400 bg-transparent border border-red-400 font-bold" variant="ghost">
                    {role?.roleType}
                </Badge>
            </div>
        </motion.div>
    );
};

export default LatestRoleCards;
