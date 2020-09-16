import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const IconContainer = styled.div`
    font-size: 1.4em;
    margin-bottom: -5px;
`;

const InputWithIcon = ({ icon, children }) => {
    return (
        <Container>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <IconContainer>{icon}</IconContainer>
                </Grid>
                <Grid item>{children}</Grid>
            </Grid>
        </Container>
    );
};

export default InputWithIcon;
