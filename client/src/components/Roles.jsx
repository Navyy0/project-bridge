import React, { useEffect, useMemo } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Role from './Role';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Roles = () => {
    const { allRoles, searchedQuery } = useSelector(store => store.role);

    // Use useMemo for optimization to avoid re-filtering unless necessary
    const filteredRoles = useMemo(() => {
        if (searchedQuery) {
            return allRoles.filter(role => {
                return role.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    role.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    role.college.toLowerCase().includes(searchedQuery.toLowerCase());
            });
        }
        return allRoles; // If no search query, return all roles
    }, [allRoles, searchedQuery]);

    return (
        <div className="bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222] min-h-screen text-gray-200 mt-[64px]">
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5 px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-5">
                    {/* Filter Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-1/4"
                    >
                        <FilterCard />
                    </motion.div>

                    {/* Roles Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 h-[calc(100vh-5rem)] overflow-y-auto pb-5"
                    >
                        {filteredRoles.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-center text-gray-400 mt-10"
                            >
                                No roles found.
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                {filteredRoles.map((role) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={role._id} // Ensure _id is defined
                                        className="bg-gray-800 rounded-lg shadow-md p-4 "
                                    >
                                        <Role role={role} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Roles;
