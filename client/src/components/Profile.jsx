import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedRoleTable from './AppliedRoleTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedRoles from '@/hooks/useGetAppliedRoles';
import { motion } from 'framer-motion';
import Footer from './shared/Footer';

const isResume = true;

const Profile = () => {
    useGetAppliedRoles();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="pb-4 bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222] text-gray-200"
            >
                <Navbar />
                {/* Main container with padding adjustment for navbar */}
                <div className="pt-20 max-w-4xl mx-auto px-6">
                    {/* Profile Information */}
                    <div className="bg-gray-800 rounded-2xl shadow-md p-6 my-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage
                                        src={
                                            user?.profile?.profilePhoto
                                                ? user?.profile?.profilePhoto
                                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8T0hZUoX8kuRi3EZpZbUDtZ_WqqN9Ll15Q&s'
                                        }
                                        alt="profile"
                                    />
                                </Avatar>
                                <div>
                                    <h1 className="font-medium text-xl text-white">{user?.fullname}</h1>
                                    <p className="text-gray-400">{user?.profile?.bio}</p>
                                </div>
                            </div>
                            <Button
                                onClick={() => setOpen(true)}
                                className="bg-[#FFB300] hover:bg-[#FFD54F] text-[#222222]"
                            >
                                <Pen className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="my-5 space-y-2">
                            <div className="flex items-center gap-3">
                                <Mail className="text-[#FFB300]" />
                                <span className="text-gray-300">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Contact className="text-[#FFB300]" />
                                <span className="text-gray-300">{user?.phoneNumber}</span>
                            </div>
                        </div>
                        <div className="my-5">
                            <h1 className="text-white mb-2">Skills</h1>
                            <div className="flex items-center gap-2 flex-wrap">
                                {user?.profile?.skills.length !== 0 ? (
                                    user?.profile?.skills.map((item, index) => (
                                        <Badge key={index} className="bg-[#FFB300] text-[#222222]">
                                            {item}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-gray-300">NA</span>
                                )}
                            </div>
                        </div>
                        <div className="my-5">
                            <Label className="text-md font-bold text-white">Resume </Label>
                            {isResume ? (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={user?.profile?.resume}
                                    className="text-[#FFB300] hover:underline"
                                >
                                    {user?.profile?.resumeOriginalName}
                                </a>
                            ) : (
                                <span className="text-gray-300">NA</span>
                            )}
                        </div>
                    </div>

                    {/* Applied Jobs Section */}
                    <div className="bg-[#111111] rounded-2xl shadow-md p-6 my-6">
                        <h1 className="font-bold text-lg text-white mb-4">Applied Roles</h1>
                        <AppliedRoleTable />
                    </div>
                </div>

                {/* Update Profile Dialog */}
                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </motion.div>
            <Footer />
        </>
    );
};

export default Profile;
