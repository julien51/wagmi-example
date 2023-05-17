import { useAccount, useConnect } from "wagmi";
import { Paywall } from "@unlock-protocol/paywall";
import networks from "@unlock-protocol/networks";

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
  const checkout = async () => {
    const paywall = new Paywall(paywallConfig, networks);
    paywall.loadCheckoutModal(
      paywallConfig,
      "https://app.unlock-protocol.com/"
    );
    return false;
  };

  return (
    <>
      <h1>wagmi + Next.js + Paywall</h1>
      <button onClick={() => checkout()}>Paywall</button>
    </>
  );
}

export default Page;
