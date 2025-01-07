import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProjectsTable = () => {
  const { projects, searchProjectByText } = useSelector((store) => store.project);
  const [filterProject, setFilterProject] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredProject = projects?.filter((project) => {
      if (!searchProjectByText) return true;
      return project?.name?.toLowerCase().includes(searchProjectByText.toLowerCase());
    });
    setFilterProject(filteredProject || []);
  }, [projects, searchProjectByText]);

  return (
    <div className="overflow-x-auto  p-4 rounded-md shadow-xl">
      <Table className="min-w-full">
        <TableCaption className="text-xl text-[#FFB300]">A list of your recently registered projects</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Logo</TableHead>
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-gray-300 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterProject?.map((project) => (
            <TableRow
              key={project._id}
              className="hover:bg-gray-700 cursor-pointer"
            >
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={project.logo || '/default-logo.png'}
                    alt={project.name}
                    className="w-12 h-12 rounded-full"
                  />
                </Avatar>
              </TableCell>
              <TableCell className="text-gray-300">{project.name}</TableCell>
              <TableCell className="text-gray-300">{project.createdAt.split('T')[0]}</TableCell>
              <TableCell className="text-right text-gray-300">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-gray-300" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-gray-700 text-gray-300">
                    <div
                      onClick={() => navigate(`/admin/projects/${project._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-600 p-2 rounded-md"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
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

export default ProjectsTable;
