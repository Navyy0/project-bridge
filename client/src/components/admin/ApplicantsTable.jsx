import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="overflow-x-auto bg-gray-800 text-white"> {/* Set text color to white for contrast */}
    <Table>
      <TableCaption className="text-[#FFB300]">A list of your recent applied users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-[#FFB300]">Full Name</TableHead>
          <TableHead className="text-[#FFB300]">Email</TableHead>
          <TableHead className="text-[#FFB300]">Contact</TableHead>
          <TableHead className="text-[#FFB300]">Resume</TableHead>
          <TableHead className="text-[#FFB300]">Date</TableHead>
          <TableHead className="text-right text-[#FFB300]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants?.applications?.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="text-gray-300">{item?.applicant?.fullname || 'N/A'}</TableCell>
            <TableCell className="text-gray-300">{item?.applicant?.email || 'N/A'}</TableCell>
            <TableCell className="text-gray-300">{item?.applicant?.phoneNumber || 'N/A'}</TableCell>
            <TableCell className="text-gray-300">
              {item.applicant?.profile?.resume ? (
                <a
                  className="text-blue-600 hover:underline"
                  href={item.applicant.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.applicant.profile.resumeOriginalName}
                </a>
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </TableCell>
            <TableCell className="text-gray-300">{item?.applicant?.createdAt?.split('T')[0] || 'N/A'}</TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="cursor-pointer text-gray-300 hover:text-[#FFB300]" />
                </PopoverTrigger>
                <PopoverContent className="w-40 bg-gray-700"> {/* Adjusted background color for popover */}
                  {shortlistingStatus.map((status, index) => (
                    <div
                      key={index}
                      onClick={() => statusHandler(status, item?._id)}
                      className="flex items-center my-2 cursor-pointer text-gray-300 hover:text-[#FFB300]"
                    >
                      <span>{status}</span>
                    </div>
                  ))}
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

export default ApplicantsTable;
