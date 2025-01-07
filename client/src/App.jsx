import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Roles from './components/Roles'
import Browse from './components/Browse'
import Profile from './components/Profile'
import RoleDescription from './components/RoleDescription'
import Projects from './components/admin/Projects'
import ProjectCreate from './components/admin/ProjectCreate'
import ProjectSetup from './components/admin/ProjectSetup'
import AdminRoles from "./components/admin/AdminRoles";
import PostRole from './components/admin/PostRole'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import UpdateRoles from './components/admin/UpdateRoles'
import ErrorPage from './components/ErrorPage'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/roles",
    element: <Roles />
  },
  {
    path: "/description/:id",
    element: <RoleDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/projects",
    element: <ProtectedRoute><Projects/></ProtectedRoute>
  },
  {
    path:"/admin/projects/create",
    element: <ProtectedRoute><ProjectCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/projects/:id",
    element:<ProtectedRoute><ProjectSetup/></ProtectedRoute> 
  },
  {
    path:"/admin/roles",
    element:<ProtectedRoute><AdminRoles/></ProtectedRoute> 
  },
  {
    path:"/admin/roles/create",
    element:<ProtectedRoute><PostRole/></ProtectedRoute> 
  },
  {
    path:"/admin/roles/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  {
    path: "/admin/roles/:id/update",
    element: <ProtectedRoute><UpdateRoles/></ProtectedRoute>,
   // errorElement: <ErrorPage />,
  }
  // , {
  //   path: "*",
  //   element: <ErrorPage />,
    
  // }

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App