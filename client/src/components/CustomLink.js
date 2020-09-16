import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const IconContainer = styled.div`
    font-size: 1.5em;
    margin-right: 15px;
    margin-top: -3px;
`;

const LinkContainer = styled.li`
    list-style: none;
    text-decoration: none;
    margin-bottom: 15px;
    margin-left: 0px;
`;

const LinkContent = styled.div`
    display: flex;
    color: black;
    text-decoration: none;
    color: #dfe6e9;
    filter: drop-shadow(2px 1px 3px rgba(0, 0, 0, 0.5));
    transition: 0.2s;
    &:hover {
        color: #f2f4f5;
        transform: translateX(20px);
        filter: drop-shadow(2px 1px 3px rgba(0, 0, 0, 0.75));
    }
    &.active {
        color: #f2f4f5;
        transform: translateX(20px);
        filter: drop-shadow(2px 1px 3px rgba(0, 0, 0, 0.75));
    }
`;

const CustomLink = ({ item }) => {
    const match = useRouteMatch({
        path: item.path,
        exact: true,
    });

    return (
        <LinkContainer>
            <Link to={item.path} style={{ textDecoration: "none" }}>
                <LinkContent className={match ? "active" : ""}>
                    <IconContainer>{item.icon}</IconContainer>
                    {item.title}
                </LinkContent>
            </Link>
        </LinkContainer>
    );
};

export default CustomLink;
