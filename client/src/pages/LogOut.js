import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/Auth";

const LogOut = () => {
    const { logout } = useAuth();
    const history = useHistory();

    useEffect(() => {
        logout();
        history.push("/");
    });

    return <div>Loading...</div>;
};

export default LogOut;
