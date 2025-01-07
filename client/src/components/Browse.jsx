import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Role from './Role';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/roleSlice';
import useGetAllRoles from '@/hooks/useGetAllRoles';

const Browse = () => {
    useGetAllRoles();
    const { allRoles } = useSelector((store) => store.role);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(''));
        };
    }, []);

    return (
        <div className="bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222] min-h-screen text-gray-200">
            <Navbar />
            <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
                {/* Added top padding (pt-20) to avoid hiding behind navbar */}
                <h1 className="font-bold text-xl sm:text-2xl text-white mb-6">
                    Search Results <span className="text-gray-400">({allRoles.length})</span>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allRoles.map((role) => (
                        <Role key={role._id} role={role} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;
