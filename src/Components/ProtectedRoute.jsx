import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Common/Loader";
import Layout from "./Layout/Layout";
import ScreenLoading from "../Common/ScreenLoading";

const ProtectedRoute = ({ children }) => {
    const { userdata, loading } = useAuth()

    if (loading) {
        return (
            <ScreenLoading />
        )
    }


    return userdata?.uid ? <Layout><Outlet /></Layout> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;