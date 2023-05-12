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

const paywall = new Paywall(networks);

function Page() {
  const { isConnected, connector } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector({
      options: {
        name: "My Injected Wallet",
        getProvider: async () => {
          // Here we need to pass the provider from the paywall object.
          // But maybe we don't open it yet?
          console.log("getProvider");
          return paywall.authenticate("http://localhost:3000");
        },
      },
    }),
  });

  const checkout = async () => {
    const provider = await connector!.getProvider();

    paywall.loadCheckoutModal(
      paywallConfig,
      "https://staging-app.unlock-protocol.com"
    );
    return false;
  };

  return (
    <>
      <h1>wagmi + Next.js + Paywall</h1>
      {!isConnected && <button onClick={() => connect()}>Connect</button>}
      {isConnected && <button onClick={() => checkout()}>Paywall</button>}
    </>
  );
}

export default Page;
