import { useAccount, useConnect } from "wagmi";
import { Paywall } from "@unlock-protocol/paywall";
import networks from "@unlock-protocol/networks";
import { InjectedConnector } from "wagmi/connectors/injected";

const paywallConfig = {
  locks: {
    "0xb7b6d5233b5015f3587f83fbc041aafd60d48339": {
      network: 5,
    },
  },
  skipRecipient: true,
  title: "My Membership",
};

function Page() {
  const { isConnected, connector } = useAccount();

  // const connect = async () => {
  //   const paywall = new Paywall({ locks: {} }, networks);
  //   console.log(paywall);
  //   const provider = await paywall.authenticate("http://localhost:3000");
  //   console.log({ provider });
  // };

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const checkout = async () => {
    const provider = await connector.getProvider();
    const paywall = new Paywall(paywallConfig, networks, provider);
    paywall.loadCheckoutModal(paywallConfig, "http://localhost:3000", provider);
    return false;
  };

  return (
    <>
      <h1>wagmi + Next.js</h1>
      {!isConnected && <button onClick={connect}>Connect</button>}
      {isConnected && <button onClick={checkout}>Paywall</button>}
    </>
  );
}

export default Page;
