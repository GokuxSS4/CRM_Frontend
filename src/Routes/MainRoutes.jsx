import { Route,Routes } from "react-router-dom";

import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Login from '../Pages/Login';
import Signup from "../Pages/Signup";

export default function MainRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    );
}