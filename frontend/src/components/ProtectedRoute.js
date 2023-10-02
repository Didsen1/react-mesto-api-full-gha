import React, { Component } from "react";
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    return (
        props.loggedIn ? props.children : <Navigate to="/sign-in" replace />
    )
}


export default ProtectedRoute;