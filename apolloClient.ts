import {ApolloClient, InMemoryCache, HttpLink, ApolloLink} from '@apollo/client';
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {OperationTypeNode} from "graphql/language";

const credentials = btoa('admin@gmail.com:admin');
//  Берём логин и пароль через двоеточие → кодируем в base64 → сохраняем в переменную.
// напр: Authorization: Basic YWRtaW5AZ21haWwuY29tOmFkbWlu

const httpLink = new HttpLink({
    uri: 'https://inctagram.work/api/v1/graphql',
    headers: {
        Authorization: `Basic ${credentials}`
    }
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'wss://inctagram.work/api/v1/subscriptions',
    connectionParams: {
        Authorization: `Basic ${credentials}`,
    },
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = ApolloLink.split(
    ({ operationType }) => {
        return operationType === OperationTypeNode.SUBSCRIPTION;
    },
    wsLink,
    httpLink
);

export const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});
