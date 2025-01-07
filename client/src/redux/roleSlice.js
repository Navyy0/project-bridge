import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name:"role",
    initialState:{
        allRoles:[],
        allAdminRoles:[],
        singleRole:null, 
        searchRoleByText:"",
        allAppliedRoles:[],
        searchedQuery:"",
    },
    reducers:{
        // actions
        setAllRoles:(state,action) => {
            state.allRoles = action.payload;
        },
        setSingleRole:(state,action) => {
            state.singleRole = action.payload;
        },
        setAllAdminRoles:(state,action) => {
            state.allAdminRoles = action.payload;
        },
        setSearchRoleByText:(state,action) => {
            state.searchRoleByText = action.payload;
        },
        setAllAppliedRoles:(state,action) => {
            state.allAppliedRoles = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});
export const {
    setAllRoles, 
    setSingleRole, 
    setAllAdminRoles,
    setSearchRoleByText, 
    setAllAppliedRoles,
    setSearchedQuery
} = roleSlice.actions;
export default roleSlice.reducer;