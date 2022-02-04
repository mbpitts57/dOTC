var OFFER_LENS_ADD = "0x45e9668Ad6a5fC79b860e82AfAE1F3BBcf5B0fC6";
var OFFER_LENS_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "offerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenWanted",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountWanted",
        type: "uint256",
      },
    ],
    name: "OfferCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenWanted", type: "address" },
      { internalType: "uint256", name: "_amountWanted", type: "uint256" },
    ],
    name: "createOffer",
    outputs: [
      { internalType: "contract LockedWETHOffer", name: "", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveOffers",
    outputs: [
      {
        internalType: "contract LockedWETHOffer[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveOffersByOwner",
    outputs: [
      {
        internalType: "contract LockedWETHOffer[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "contract LockedWETHOffer[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "end", type: "uint256" },
    ],
    name: "getActiveOffersByRange",
    outputs: [
      {
        internalType: "contract LockedWETHOffer[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "offers",
    outputs: [
      { internalType: "contract LockedWETHOffer", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_fee", type: "uint256" }],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export { OFFER_LENS_ABI, OFFER_LENS_ADD };
