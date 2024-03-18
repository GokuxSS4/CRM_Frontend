import { Route,Routes } from "react-router-dom";

import Login from '../Pages/Login';
import Signup from "../Pages/Signup";

export default function MainRoutes(){
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    );
}