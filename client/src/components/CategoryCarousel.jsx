import React from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/roleSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchRoleHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className="w-full max-w-4xl mx-auto my-20 px-12 relative">
            <Carousel className="w-full">
                <div className="relative">
                    <CarouselContent>
                        {category.map((cat, index) => (
                            <motion.div
                                key={index}
                                className="p-4"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                            >
                                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                    <Button
                                        onClick={() => searchRoleHandler(cat)}
                                        variant="outline"
                                        className="w-full rounded-full text-lg font-semibold bg-gray-800 text-[#FFB300] hover:from-[#111111] hover:to-[#6A38C2] hover:text-white transition-all duration-300"
                                    >
                                        {cat}
                                    </Button>
                                </CarouselItem>
                            </motion.div>
                        ))}
                    </CarouselContent>
                </div>
                
                {/* Navigation buttons - hidden on mobile */}
                <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2">
                    <CarouselPrevious className="relative text-[#FFB300] hover:text-[#6A38C2] bg-gray-800 hover:bg-gray-700" />
                </div>
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2">
                    <CarouselNext className="relative text-[#FFB300] hover:text-[#6A38C2] bg-gray-800 hover:bg-gray-700" />
                </div>
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;