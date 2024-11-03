import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom"; 
import Home from "../page/home/Home";

import Signup from "../page/signup/Signup";
import Login from "../page/signin/Login";
import Createnote from "../page/createNote/Createnote";
import PrivateRouting from "./PrivateRouting";
import PublicRouting from "./PublicRouting";
  const router = createBrowserRouter([
    {
        path: '/',
        element:<PrivateRouting><Home/></PrivateRouting>
    },
    {
        path : '/signup',
        element : <PublicRouting><Signup/></PublicRouting>
    },
    {
        path : '/SignIn',
        element : <PublicRouting><Login/></PublicRouting>
    },
    {
        path: "/Addnote/:id?",
        element : <PrivateRouting><Createnote/></PrivateRouting>
    }
    ]);
export default function Routing() {
      return (
        <RouterProvider router={router}/>
    )
      
    }
    