import React from 'react';
import LatestRoleCards from './LatestRoleCards';
import { useSelector } from 'react-redux'; 
import { motion } from 'framer-motion';

const LatestRoles = () => {
    const { allRoles } = useSelector(store => store.role);
   
    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-4xl font-bold text-white">
                <span className="text-[#FFB300]">Latest</span> Roles
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                {
                    allRoles.length <= 0 
                    ? <span className="text-gray-400">No Role Available</span> 
                    : allRoles?.slice(0, 6).map((role) => (
                        <motion.div
                            key={role._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <LatestRoleCards key={role._id} role={role} />
                        </motion.div>
                    ))
                }
            </div>
        </div>
    );
};

export default LatestRoles;
