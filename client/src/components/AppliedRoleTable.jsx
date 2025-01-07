import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from './ui/table';

const AppliedRoleTable = () => {
    const { allAppliedRoles } = useSelector(state => state.role);

    const getStatusColor = (status) => {
        if (!status) return 'text-gray-400'; // Fallback color for undefined status
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'text-[#FFB300]'; // Gold for pending
            case 'accepted':
                return 'text-green-400'; // Green for accepted
            case 'rejected':
                return 'text-red-400'; // Red for rejected
            default:
                return 'text-gray-400'; // Gray for unknown
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="overflow-x-auto">
                <Table className="table-auto w-full border border-[#222222] rounded-lg bg-[#111111] text-gray-200">
                    <TableHeader>
                        <TableRow className="bg-[#222222] text-white">
                            <TableCell className="border-b border-[#222222] px-4 py-3">Role Title</TableCell>
                            <TableCell className="border-b border-[#222222] px-4 py-3">Recruiter Name</TableCell>
                            <TableCell className="border-b border-[#222222] px-4 py-3">Applied Date</TableCell>
                            <TableCell className="border-b border-[#222222] px-4 py-3">Status</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allAppliedRoles?.length > 0 ? (
                            allAppliedRoles?.map((appliedRole, index) => (
                                <motion.tr
                                    key={appliedRole._id}
                                    className="hover:bg-[#333333] transition-colors duration-300 text-gray-200"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <TableCell className="border-b border-[#222222] px-4 py-3">
                                        {appliedRole?.role?.title || 'N/A'}
                                    </TableCell>
                                    <TableCell className="border-b border-[#222222] px-4 py-3">
                                        {appliedRole?.role?.project?.name || 'N/A'}
                                    </TableCell>
                                    <TableCell className="border-b border-[#222222] px-4 py-3">
                                        {new Date(appliedRole.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell
                                        className={`border-b border-[#222222] px-4 py-3 ${getStatusColor(
                                            appliedRole?.status
                                        )}`}
                                    >
                                        {appliedRole?.status || 'Unknown'}
                                    </TableCell>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No applied roles found
                                </td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
};

export default AppliedRoleTable;
