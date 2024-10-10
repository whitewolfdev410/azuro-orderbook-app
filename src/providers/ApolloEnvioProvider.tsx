'use client'

import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'


const APIURL = 'http://localhost:8080/v1/graphql'

const EnvioClient = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})

export default EnvioClient;
