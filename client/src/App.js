import React, { useEffect } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "./context/Auth";

import ProtectedRoute from "./components/ProtectedRoute";

import LogIn from "./pages/LogIn";
import SignIn from "./pages/SignIn";
import LogOut from "./pages/LogOut";
import OnlyUnauthorizedRoute from "./components/OnlyUnauthorizedRoute";
import Profile from "./pages/Profile";

const AppContainer = styled.div`
    display: flex;
    position: relative;
`;

const MainContentContainer = styled.div`
    margin-left: 250px;
    width: 100%;
`;

function App() {
    const { restoreAuth } = useAuth();

    useEffect(() => {
        restoreAuth();
    });

    return (
        <AppContainer>
            <Router>
                <Nav />
                <MainContentContainer>
                    <Switch>
                        <Route exact path="/">
                            Home page
                        </Route>
                        <ProtectedRoute exact path="/courses/my">
                            My Courses page
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/courses/workshop">
                            My Workshop page
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/courses/wishlist">
                            My Wishlist page
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/profile">
                            <Profile />
                        </ProtectedRoute>
                        <OnlyUnauthorizedRoute exact path="/login">
                            <LogIn />
                        </OnlyUnauthorizedRoute>
                        <OnlyUnauthorizedRoute exact path="/signin">
                            <SignIn />
                        </OnlyUnauthorizedRoute>
                        <ProtectedRoute exact path="/logout">
                            <LogOut />
                        </ProtectedRoute>
                    </Switch>
                </MainContentContainer>
            </Router>
        </AppContainer>
    );
}

export default App;
