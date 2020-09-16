import React from "react";
import {
    BiHomeAlt,
    BiGridAlt,
    BiLogIn,
    BiLogInCircle,
    BiLogOut,
    BiWrench,
    BiHeart,
    BiUser,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/Auth";

import CustomLink from "./CustomLink";

const NavBar = styled.nav`
    height: 100vh;
    position: fixed;
    width: 250px;
    background: #6c5ce7;
    padding: 25px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Logo = styled.h1`
    color: #dfe6e9;
    font-size: 35px;
    filter: drop-shadow(2px 1px 3px rgba(0, 0, 0, 0.5));
    margin-bottom: 20px;
    width: 100%;
    text-align: center;
`;

const Nav = () => {
    const { isAuthenticated } = useAuth();

    let navLinks = [
        {
            title: "Home",
            icon: <BiHomeAlt />,
            path: "/",
        },
    ];
    if (isAuthenticated)
        navLinks = [
            ...navLinks,
            {
                title: "My Courses",
                icon: <BiGridAlt />,
                path: "/courses/my",
            },
            {
                title: "Workshop",
                icon: <BiWrench />,
                path: "/courses/workshop",
            },
            {
                title: "Wishlist",
                icon: <BiHeart />,
                path: "/courses/wishlist",
            },
        ];

    let authLinks = [];
    if (isAuthenticated)
        authLinks = [
            {
                title: "Profile",
                icon: <BiUser />,
                path: "/profile",
            },

            {
                title: "Log Out",
                icon: <BiLogOut />,
                path: "/logout",
            },
        ];
    else
        authLinks = [
            {
                title: "Log In",
                icon: <BiLogIn />,
                path: "/login",
            },
            {
                title: "Sign In",
                icon: <BiLogInCircle />,
                path: "/signin",
            },
        ];

    return (
        <NavBar>
            <ul>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Logo>GUIDER</Logo>
                </Link>
                {navLinks.map((item, indx) => (
                    <CustomLink item={item} key={indx} />
                ))}
            </ul>

            <ul>
                {authLinks.map((item, indx) => (
                    <CustomLink item={item} key={indx} />
                ))}
            </ul>
        </NavBar>
    );
};

export default Nav;
