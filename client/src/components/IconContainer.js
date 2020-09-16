import React from "react";
import styled from "styled-components";

const Container = styled.div`
    font-size: 1.3em;
    margin-right: 15px;
`;

const IconContainer = ({ children }) => {
    return <Container>{children}</Container>;
};

export default IconContainer;
