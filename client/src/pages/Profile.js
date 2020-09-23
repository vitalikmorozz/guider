import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import { BiWrench } from "react-icons/bi";

import TextField from "@material-ui/core/TextField";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import CircularProgress from "@material-ui/core/CircularProgress";

import InputWithIcon from "../components/InputWithIcon";
import { CenterForm, FormContainer } from "../ui/Forms";
import useAlert from "../useAlert";

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

const UPDATE_USER_INFO = gql`
    mutation Update(
        $email: String!
        $firstName: String!
        $lastName: String!
        $password: String!
    ) {
        updateMe(
            updateUserData: {
                email: $email
                firstName: $firstName
                lastName: $lastName
                password: $password
            }
        ) {
            id
        }
    }
`;

const ButtonContainer = styled.span`
    margin: 0 10px;
`;

const MarginContainer = styled.div`
    margin-top: 25px;
`;

const Profile = () => {
    const [alerts, showAlerts] = useAlert();
    const [isLoadingMutation, setIsLoadingMutation] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error, data, refetch } = useQuery(GET_MY_INFO);

    const [updateInfo] = useMutation(UPDATE_USER_INFO, {
        onCompleted: () => {
            setIsLoadingMutation(false);
            setIsEdit(false);
            refetch();
        },
        onError: (err) => {
            setIsLoadingMutation(false);
            showAlerts(err.message, "error");
        },
    });

    useEffect(() => {
        if (data) {
            setEmail(data.me.email);
            setFirstName(data.me.firstName);
            setLastName(data.me.lastName);
        }
    }, [data]);

    const handleSubmit = () => {
        setIsLoadingMutation(true);
        if (password)
            updateInfo({ variables: { firstName, lastName, email, password } });
        else updateInfo({ variables: { firstName, lastName, email } });
    };

    const handleCancel = () => {
        setEmail(data.me.email);
        setFirstName(data.me.firstName);
        setLastName(data.me.lastName);
        setPassword("");
        refetch();
        setIsEdit(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <FormContainer style={{ marginTop: "-175px" }}>
            <Title>Profile Info</Title>
            <BiUserCircle style={{ width: "75px", height: "75px" }} />

            <CenterForm>
                <InputWithIcon icon={<HiOutlineMail />}>
                    <TextField
                        style={{ width: "250px" }}
                        id="standard-basic"
                        label={isEdit ? "New First Name" : "First Name"}
                        type="text"
                        disabled={!isEdit}
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </InputWithIcon>
                <InputWithIcon icon={<HiOutlineMail />}>
                    <TextField
                        style={{ width: "250px" }}
                        id="standard-basic"
                        label={isEdit ? "New Last Name" : "Last Name"}
                        type="text"
                        disabled={!isEdit}
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </InputWithIcon>
                <InputWithIcon icon={<HiOutlineMail />}>
                    <TextField
                        style={{ width: "250px" }}
                        id="standard-basic"
                        label={isEdit ? "New Email" : "Email"}
                        type="text"
                        name="email"
                        disabled={!isEdit}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputWithIcon>
                {isEdit ? (
                    <InputWithIcon icon={<RiLockPasswordLine />}>
                        <TextField
                            style={{ width: "250px" }}
                            id="standard-password-input"
                            label="New Password"
                            type="password"
                            name="password"
                            disabled={!isEdit}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputWithIcon>
                ) : (
                    <></>
                )}
                {alerts}
                <MarginContainer>
                    {!isEdit ? (
                        <ButtonContainer>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setIsEdit(true)}
                            >
                                <BiWrench />
                                Edit Profile <BiWrench />
                            </Button>
                        </ButtonContainer>
                    ) : !isLoadingMutation ? (
                        <>
                            <ButtonContainer>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </Button>
                            </ButtonContainer>
                            <ButtonContainer>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </ButtonContainer>
                        </>
                    ) : (
                        <CircularProgress />
                    )}
                </MarginContainer>
            </CenterForm>
        </FormContainer>
    );
};

export default Profile;
