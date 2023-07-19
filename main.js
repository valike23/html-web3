import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
    WagmiCore,
    WagmiCoreChains,
    WagmiCoreConnectors,
  } from "https://unpkg.com/@web3modal/ethereum@2.6.2";
  
  import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";
  
  // 0. Import wagmi dependencies
  const { mainnet, polygon, avalanche, arbitrum } = WagmiCoreChains;
  const { configureChains, createConfig } = WagmiCore;
  
  // 1. Define chains
  export const chains = [mainnet, polygon, avalanche, arbitrum];
  const projectId = "23a783ed0eec2a44e1326a062759acb0";
  
  // 2. Configure wagmi client
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
  export const testProvider = publicClient;
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      ...w3mConnectors({ chains, version: 2, projectId }),
      new WagmiCoreConnectors.CoinbaseWalletConnector({
        chains,
        options: {
          appName: "PEP coin",
        },
      }),
    ],
    publicClient,
  });
  
  // 3. Create ethereum and modal clients
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  export const web3Modal = new Web3Modal(
    {
      projectId,enableAccountView: true,
      walletImages: {
        safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
      },
    },
    ethereumClient
  );

  console.log('client', publicClient({chainId: chains[0]}));
  console.log(web3Modal);
  console.log(ethereumClient.wagmi)