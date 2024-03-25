import { Route,Routes } from "react-router-dom";

import CreateTicket from "../Pages/CreateTicket";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Login from '../Pages/Login';
import Signup from "../Pages/Signup";
import UserList from "../Pages/UsersList";
import AuthRoutes from "./AuthRoutes";

export default function MainRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route element={<AuthRoutes allowListedRoles={['admin']}/>}>
                <Route path="/users" element={<UserList/>} />
            </Route>

            <Route path="/ticket/create" element={<CreateTicket/>}/>

        </Routes>
    );
}