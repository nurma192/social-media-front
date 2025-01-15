import React from 'react';
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "../app/hooks";
import type {RootState} from "../app/store";

function ProtectedRoute() {
    const navigate = useNavigate();
    const token = useAppSelector((state: RootState) => state.auth.token)

    if (!token) {
        return <Navigate to="/auth/login" replace/>
    }

    return (
        <Outlet />
    );
}

export default ProtectedRoute;
