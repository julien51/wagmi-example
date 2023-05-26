export const lockAddress = "0xb7b6d5233b5015f3587f83fbc041aafd60d48339";
export const network = 5;

export const paywallConfig = {
  locks: {
    [lockAddress]: {
      network,
    },
  },
  skipRecipient: true,
  title: "My Membership",
  pessimistic: true,
};
