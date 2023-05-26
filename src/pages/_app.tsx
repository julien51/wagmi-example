import { WagmiConfig, createClient } from "wagmi";
import { ethers, getDefaultProvider } from "ethers";
import { network } from "./config";

const client = createClient({
  autoConnect: true,
  provider: new ethers.providers.JsonRpcProvider(
    `https://rpc.unlock-protocol.com/${network}`,
    network
  ),
});

function App({ Component, pageProps }: any) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default App;
