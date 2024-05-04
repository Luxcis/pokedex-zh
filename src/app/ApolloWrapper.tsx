'use client'

import { ApolloProvider } from '@apollo/client'
import client from '@/graphql/appllo-client'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ApolloWrapper: FC<Props> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloWrapper
