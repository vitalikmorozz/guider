import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";

import InputWithIcon from "../components/InputWithIcon";
import { CenterForm, FormContainer } from "../ui/Forms";
import { Title } from "../ui/Text";
import { useAuth } from "../context/Auth";
import useAlert from "../useAlert";

const MarginContainer = styled.div`
    margin-top: 25px;
`;

const LOG_IN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            access_token
        }
    }
`;

const LogIn = () => {
    const history = useHistory();
    const [alerts, showAlerts] = useAlert();
    const { login: loginAsUser } = useAuth();

    const [login] = useMutation(LOG_IN, {
        onCompleted: (data) => {
            loginAsUser(data.login.access_token);
            history.push("/");
        },
        onError: (err) => {
            showAlerts(err.message, "error");
            setDisabled(false);
        },
    });

    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);
        login({ variables: { email, password } });
    };

    // const clearInputs = () => {
    //     setEmail("");
    //     setPassword("");
    // };

    return (
        <FormContainer>
            <Title>Log In</Title>

            <CenterForm onSubmit={handleSubmit}>
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
                        autoComplete="current-password"
                        name="password"
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
                            Log in
                        </Button>
                    ) : (
                        <CircularProgress />
                    )}
                </MarginContainer>

                <MarginContainer>
                    Don`t have account yet? <Link to="/signin">Sign in!</Link>
                </MarginContainer>
            </CenterForm>
        </FormContainer>
    );
};

export default LogIn;
