import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AdminRolesTable = () => {
    const { allAdminRoles, searchRoleByText } = useSelector((store) => store.role);
    const [filterRoles, setFilterRoles] = useState(allAdminRoles);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredRoles = allAdminRoles.filter((role) => {
            if (!searchRoleByText) return true;
            return (
                role?.title?.toLowerCase().includes(searchRoleByText.toLowerCase()) ||
                role?.project?.name?.toLowerCase().includes(searchRoleByText.toLowerCase())
            );
        });
        setFilterRoles(filteredRoles);
    }, [allAdminRoles, searchRoleByText]);

    return (
        <div className="overflow-x-auto bg-gray-800 p-4 rounded-md shadow-md">
            <Table className="min-w-full">
                <TableCaption className="text-xl text-[#FFB300]">
                    A list of your recently posted roles
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-300">Project Name</TableHead>
                        <TableHead className="text-gray-300">Role</TableHead>
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterRoles?.map((role) => (
                        <TableRow
                            key={role._id}
                            className="hover:bg-gray-700 cursor-pointer"
                        >
                            <TableCell className="text-gray-300">
                                {role?.project?.name || 'N/A'}
                            </TableCell>
                            <TableCell className="text-gray-300">
                                {role?.title || 'N/A'}
                            </TableCell>
                            <TableCell className="text-gray-300">
                                {role?.createdAt
                                    ? format(new Date(role.createdAt), 'yyyy-MM-dd')
                                    : 'N/A'}
                            </TableCell>
                            <TableCell className="text-right text-gray-300">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-gray-300 cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-gray-700 text-gray-300">
                                        <div
                                            onClick={() =>
                                                role._id && navigate(`/admin/roles/${role._id}/update`)
                                            }
                                            className="flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-600 p-2 rounded-md"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                        <div
                                            onClick={() =>
                                                role._id &&
                                                navigate(`/admin/roles/${role._id}/applicants`)
                                            }
                                            className="flex items-center gap-2 w-fit cursor-pointer mt-2 hover:bg-gray-600 p-2 rounded-md"
                                        >
                                            <Eye className="w-4" />
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminRolesTable;
