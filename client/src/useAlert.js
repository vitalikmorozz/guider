import React, { useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import styled from "styled-components";

const AlertContainer = styled.div`
    margin-top: 15px;
`;

const useAlert = () => {
    const [type, setType] = useState("success");
    const [alertMessages, setAlertMessages] = useState([]);
    const [alerts, setAlerts] = useState("");

    useEffect(() => {
        setAlerts(
            alertMessages.map((msg) => (
                <AlertContainer>
                    <Alert severity={type}>{msg}</Alert>
                </AlertContainer>
            ))
        );
    }, [alertMessages, type]);

    const showAlerts = (messages, type) => {
        setType(type);
        if (typeof messages === typeof []) setAlertMessages(messages);
        else setAlertMessages([messages]);
        setTimeout(() => {
            setAlertMessages([]);
        }, 4000);
    };

    return [alerts, showAlerts];
};

export default useAlert;
