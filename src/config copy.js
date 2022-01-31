export const WETH_LENS_ADDRESS = "0xbb6692D85fF5E4269E78B7E64919e2c994dc9104";
export const WETH_LENS_ABI = [
  {
    inputs: [],
    name: "DAI",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FEI",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDC",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDT",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IOfferFactory",
        name: "factory",
        type: "address",
      },
    ],
    name: "getActiveOffersPruned",
    outputs: [
      {
        internalType: "contract ILockedWETHOffer[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IOfferFactory",
        name: "factory",
        type: "address",
      },
    ],
    name: "getAllActiveOfferInfo",
    outputs: [
      { internalType: "address[]", name: "offerAddresses", type: "address[]" },
      { internalType: "uint256[]", name: "WETHBalances", type: "uint256[]" },
      { internalType: "address[]", name: "tokenWanted", type: "address[]" },
      { internalType: "uint256[]", name: "amountWanted", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ILockedWETHOffer",
        name: "offer",
        type: "address",
      },
    ],
    name: "getOfferInfo",
    outputs: [
      { internalType: "uint256", name: "WETHBalance", type: "uint256" },
      { internalType: "address", name: "tokenWanted", type: "address" },
      { internalType: "uint256", name: "amountWanted", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IOfferFactory",
        name: "factory",
        type: "address",
      },
    ],
    name: "getVolume",
    outputs: [{ internalType: "uint256", name: "sum", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
