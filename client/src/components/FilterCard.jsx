import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/roleSlice';

const filterData = [
    {
        filterType: "College",
        array: ["VIT Bhopal", "VIT Vellore", "VIT Amravati", "VIT Chennai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    }
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222]  md:p-10 rounded-lg shadow-md text-gray-200 overflow-auto"
        >
            <h1 className="font-bold text-lg mb-4 text-white">Filter Roles</h1>
            <hr className="mt-3 mb-4 border-gray-700" />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index} className="mb-6">
                        <h2 className="font-semibold text-md mb-2 text-gray-300">{data.filterType}</h2>
                        <div className="space-y-2">
                            {data.array.map((item, idx) => {
                                const itemId = `id-${index}-${idx}`;
                                return (
                                    <motion.div
                                        key={itemId}
                                        className="flex items-center space-x-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    >
                                        <RadioGroupItem
                                            value={item}
                                            id={itemId}
                                            className="bg-gray-800 border-gray-600 hover:border-yellow-400 focus:ring-yellow-500"
                                        />
                                        <Label htmlFor={itemId} className="text-gray-400 hover:text-yellow-400">
                                            {item}
                                        </Label>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </motion.div>
    );
};

export default FilterCard;
