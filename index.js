import React from 'react';
import {AppRegistry} from 'react-native';

import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient, InMemoryCache} from 'apollo-boost';
import {split} from "apollo-link";
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import Router from './src/Router';
import {name as appName} from './app.json';

//uri: 'http://192.168.1.22:4000/graphql',
//uri: 'https://api.realtimescrumpoker.site/graphql',
//uri: 'https://rt-scrum-poker-server.herokuapp.com/graphql',
const httpLink = new HttpLink({
    uri: 'https://api.realtimescrumpoker.site/graphql',
});

// Create a WebSocket link:
//uri: 'ws://192.168.1.22:4000/graphql',
//uri: 'wss://api.realtimescrumpoker.site/graphql',
//uri: 'wss://rt-scrum-poker-server.herokuapp.com/graphql',
const wsLink = new WebSocketLink({
    uri: 'wss://api.realtimescrumpoker.site/graphql',
    options: {
        reconnect: true
    }
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

const App = () => (
    <ApolloProvider client={client}>
        <Router />
    </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
