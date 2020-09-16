import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";

import InputWithIcon from "../components/InputWithIcon";
import { CenterForm, FormContainer } from "../ui/Forms";
import { Title } from "../ui/Text";
import { useAuth } from "../context/Auth";
import useAlert from "../useAlert";

const MarginContainer = styled.p`
    margin-top: 25px;
`;

const SIGN_IN = gql`
    mutation Register(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String!
    ) {
        register(
            user: {
                email: $email
                password: $password
                firstName: $firstName
                lastName: $lastName
            }
        ) {
            access_token
        }
    }
`;

const SignIn = () => {
    const [alerts, showAlerts] = useAlert();
    const { login: loginAsUser } = useAuth();

    const [register] = useMutation(SIGN_IN, {
        onCompleted: (data) => {
            loginAsUser(data.register.access_token);
            setDisabled(false);
        },
        onError: (err) => {
            showAlerts(err.message, "error");
            setDisabled(false);
        },
    });

    const [disabled, setDisabled] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);
        register({ variables: { email, password, firstName, lastName } });
    };

    // const clearInputs = () => {
    //     setEmail("");
    //     setPassword("");
    //     setFirstName("");
    //     setLastName("");
    // };

    return (
        <FormContainer>
            <Title>Sign In</Title>
            <CenterForm onSubmit={handleSubmit}>
                <InputWithIcon icon={<BiUser />}>
                    <TextField
                        style={{ width: "250px" }}
                        id="standard-basic"
                        label="First name"
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={disabled}
                    />
                </InputWithIcon>
                <InputWithIcon icon={<BiUser />}>
                    <TextField
                        style={{ width: "250px" }}
                        id="standard-basic"
                        label="Last name"
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={disabled}
                    />
                </InputWithIcon>
                <InputWithIcon icon={<HiOutlineMail />}>
                    <TextField
                        style={{ width: "250px" }}
                        id="standard-basic"
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={disabled}
                    />
                </InputWithIcon>
                <InputWithIcon icon={<RiLockPasswordLine />}>
                    <TextField
                        style={{ width: "250px" }}
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={disabled}
                    />
                </InputWithIcon>
                {alerts}
                <MarginContainer>
                    {!disabled ? (
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Sign in
                        </Button>
                    ) : (
                        <CircularProgress />
                    )}
                </MarginContainer>
                <MarginContainer>
                    Already have account? <Link to="/login">Log in!</Link>
                </MarginContainer>
            </CenterForm>
        </FormContainer>
    );
};

export default SignIn;
