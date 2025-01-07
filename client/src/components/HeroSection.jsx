import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/roleSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { toast } from 'sonner';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchRoleHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <motion.div
            className=" py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="text-center flex flex-col gap-5 my-10 px-4">
                <motion.span
                    className="mx-auto px-4 py-2 rounded-full bg-[#333333] text-[#FFB300] font-medium"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    Your Gateway to Collaboration & Growth
                </motion.span>

                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFB300]"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Connect, Collaborate <br />
                    <span className="text-[#FF9800]"> & Build Impactful Projects</span>
                </motion.h1>

                <motion.p
                    className="text-base sm:text-lg text-[#BDBDBD]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Find opportunities to work on exciting projects, collaborate with like-minded peers, and grow your skills—all while building a portfolio that stands out.
                </motion.p>

                <motion.div
    className="flex w-full sm:w-[70%] lg:w-[50%] shadow-md border border-[#333333] pl-3 pr-2 py-2 rounded-full items-center gap-4 mx-auto bg-[#222222] bg-opacity-90"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
>
    <Input
        type="text"
        value={query}
        placeholder="Search for opportunities or collaborators"
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 outline-none border-none bg-transparent text-white placeholder-[#BDBDBD] rounded-full focus:ring-2 focus:ring-[#FF9800]"
    />

    <Button
        onClick={searchRoleHandler}
        className="rounded-full bg-gradient-to-r from-[#FFB300] to-[#FF9800] text-[#222222] hover:from-[#FF9800] hover:to-[#FFB300] px-6 py-3 flex items-center"
    >
        <Search className="h-5 w-5 mr-2 text-[#0097A7]" />
        Search
    </Button>
</motion.div>


            </div>
        </motion.div>
    );
};

export default HeroSection;
