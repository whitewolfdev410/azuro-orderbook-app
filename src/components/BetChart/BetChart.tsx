import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client';
import { ApolloProvider, AzuroSDKProvider } from '@azuro-org/sdk'
import envioClient from '@/providers/ApolloEnvioProvider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid  } from 'recharts';
import {ODDS_DECIMALS} from '@azuro-org/toolkit'
import { CustomMarketOutcome, ExploreContext } from '@/contexts'

const oddsQuery = gql`
  query MyQuery($conditionId: numeric) {
  PrematchCore_OddsChanged(where: {conditionId: {_eq: $conditionId}}) {
    newOdds
    conditionId
    blockTimestamp
  }
}
`

type outcomeSelected = 0 | 1;

export default function BetChart({ conditionId }: { conditionId: string | undefined}) {
  const { outcomeSelected } = useContext(ExploreContext) as { outcomeSelected: CustomMarketOutcome };
  
  const outcomeNum = "_outcomeSelected" in outcomeSelected? outcomeSelected._outcomeSelected: 0;

  const { loading, error, data: _data } = useQuery(oddsQuery, { client: envioClient, variables: { conditionId: conditionId} });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const data = _data.PrematchCore_OddsChanged.map((item: {blockTimestamp: number, newOdds: number[]}) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' };
    return {
      blockTimestamp: new Date(item.blockTimestamp*1000).toLocaleDateString('en-US', options),
      odds: item.newOdds[outcomeNum]/10**ODDS_DECIMALS,
    }
  })

  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="odds" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="blockTimestamp" />
      <YAxis />
    </LineChart>
  )
}