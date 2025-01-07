import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminRolesTable from './AdminRolesTable';
import useGetAllAdminRoles from '@/hooks/useGetAllAdminRoles';
import { setSearchRoleByText } from '@/redux/roleSlice';
import { useDebounce } from 'use-debounce';  // Import debounce hook

const AdminRoles = () => {
  useGetAllAdminRoles();  // Custom hook to get all roles
  const [input, setInput] = useState('');  // State for search input
  const [debouncedInput] = useDebounce(input, 500);  // Debounce input value by 500ms
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedInput) {
      dispatch(setSearchRoleByText(debouncedInput));  // Dispatch action with debounced input
    }
  }, [debouncedInput, dispatch]);  // Depend on debouncedInput instead of raw input

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 mt-[80px] bg-gray-800 rounded-md p-4">
        <div className="flex items-center justify-between my-5 ">
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            value={input}  // Controlled input for the search
            onChange={(e) => setInput(e.target.value)}  // Update input state
          />
          <Button onClick={() => navigate('/admin/roles/create')}>New Role</Button>
        </div>
        <AdminRolesTable />
      </div>
    </div>
  );
};

export default AdminRoles;
