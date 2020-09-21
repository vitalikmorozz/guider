import React from "react";
import Button from "@material-ui/core/Button";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BiWrench, BiUser } from "react-icons/bi";

import { Title } from "../ui/Text";

const GET_MY_INFO = gql`
    query Me {
        me {
            firstName
            lastName
            email
        }
    }
`;

const CenterContainer = styled.div`
    width: 100%;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ItemContainer = styled.div`
    margin: 10px 0;
`;

const Profile = () => {
    const history = useHistory();
    const { loading, error, data } = useQuery(GET_MY_INFO);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <CenterContainer>
            <Title>Profile Info</Title>
            <BiUser style={{ width: "75px", height: "75px" }} />
            <ItemContainer>
                <p>First Name: {data.me.firstName}</p>
            </ItemContainer>
            <ItemContainer>
                <p>Last Name: {data.me.lastName}</p>
            </ItemContainer>
            <ItemContainer>
                <p>Email: {data.me.email}</p>
            </ItemContainer>
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/profile/edit")}
            >
                <BiWrench />
                Edit Profile <BiWrench />
            </Button>
        </CenterContainer>
    );
};

export default Profile;
