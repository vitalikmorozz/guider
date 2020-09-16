import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const Backdrop = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99999;
    display: ${(props) => (props.open ? "flex" : "none")};
    align-items: center;
    justify-content: center;
`;

const LoaderWithBackdrop = ({ open }) => {
    return (
        <Backdrop open={open}>
            <CircularProgress />
        </Backdrop>
    );
};

export default LoaderWithBackdrop;
