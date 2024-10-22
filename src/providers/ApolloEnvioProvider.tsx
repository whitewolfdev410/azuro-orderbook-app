'use client'

import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'


const APIURL = 'https://indexer.bigdevenergy.link/c1a80e6/v1/graphql'

const EnvioClient = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})

export default EnvioClient;
