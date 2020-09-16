import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import App from "./App";
import { AuthProvider } from "./context/Auth";

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql/",
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
