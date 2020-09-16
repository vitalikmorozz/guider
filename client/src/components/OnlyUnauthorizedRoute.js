import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/Auth";

const OnlyUnauthorizedRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return (
        <Route
            {...rest}
            render={() =>
                !isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                        }}
                    />
                )
            }
        />
    );
};

export default OnlyUnauthorizedRoute;
