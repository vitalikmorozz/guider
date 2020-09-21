import React from "react";
import ReactDOM from "react-dom";
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App";
import { AuthProvider } from "./context/Auth";

const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql/",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
