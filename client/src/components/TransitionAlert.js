import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styled from "styled-components";

const AlertContainer = styled.div`
    margin-top: 15px;
`;

const TransitionAlert = ({ children, severity }) => {
    const [open, setOpen] = useState(true);

    return (
        <Collapse in={open}>
            <AlertContainer>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <IoMdCloseCircleOutline fontSize="inherit" />
                        </IconButton>
                    }
                    severity={severity}
                >
                    {children}
                </Alert>
            </AlertContainer>
        </Collapse>
    );
};

export default TransitionAlert;
