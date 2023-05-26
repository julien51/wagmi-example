import { useAccount, useConnect, useContractRead } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { TokenGate } from "./TokenGate";
import { Content } from "./content";
import { disconnect } from "@wagmi/core";

function Page() {
  const { isConnected } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <>
      <h1>wagmi + Next.js + Paywall</h1>
      {!isConnected && <button onClick={() => connect()}>Connect</button>}
      {isConnected && (
        <>
          <button onClick={() => disconnect()}>Disconnect</button>
          <TokenGate>
            <Content />
          </TokenGate>
        </>
      )}
    </>
  );
}

export default Page;
