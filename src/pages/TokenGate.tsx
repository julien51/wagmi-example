import { useAccount, useContractRead } from "wagmi";
import { PublicLockV13 } from "@unlock-protocol/contracts";
import { lockAddress, paywallConfig } from "./config";
import { Paywall } from "@unlock-protocol/paywall";
import networks from "@unlock-protocol/networks";
import { useState } from "react";

interface TokenGateProps {
  children: React.ReactNode;
}

export const TokenGate = ({ children }: TokenGateProps) => {
  const [hash, setHash] = useState("");
  const { connector, address } = useAccount();

  const checkout = async () => {
    const provider = await connector!.getProvider();
    const paywall = new Paywall(paywallConfig, networks, provider);
    const result = await paywall.loadCheckoutModal(paywallConfig);
    if (result.hash) {
      setHash(hash);
    }
  };

  const { data, isError, isLoading } = useContractRead({
    address: lockAddress,
    abi: PublicLockV13.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true, // important!
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>There was an error... please refresh!</p>;
  }

  if (data.eq(0)) {
    if (hash) {
      return <p>Waiting for transaction to confirm...</p>;
    }
    return (
      <p>
        <button onClick={checkout}>Buy Membership!</button>
      </p>
    );
  }

  // Win, the user has a valid membership!
  return children;
};
