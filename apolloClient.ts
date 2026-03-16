import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';

const credentials = btoa('admin@gmail.com:admin');
//  Берём логин и пароль через двоеточие → кодируем в base64 → сохраняем в переменную.
// напр: Authorization: Basic YWRtaW5AZ21haWwuY29tOmFkbWlu

const httpLink = new HttpLink({
    uri: 'https://inctagram.work/api/v1/graphql',
    headers: {
        Authorization: `Basic ${credentials}`
    }
});

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
