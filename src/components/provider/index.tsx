"use client";

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
/*@ts-ignore*/
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { polygonAmoy } from "viem/chains";
/*@ts-ignore*/
import { EthereumWalletConnectors, } from "@dynamic-labs/ethereum";
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";

const config = createConfig({
  chains: [polygonAmoy],
  multiInjectedProviderDiscovery: false,
  transports: {
    [polygonAmoy.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function Provider({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_PROJECT_ID!,
        walletConnectors: [EthereumWalletConnectors,ZeroDevSmartWalletConnectors],
      }}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            {children}
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
