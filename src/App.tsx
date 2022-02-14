// App.tsx
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  OrderedList,
  ListItem,
  UnorderedList,
  Button,
  Divider,
  Link,
} from "@chakra-ui/react";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import { Box, Center } from "@chakra-ui/react";
import React, { Component, useEffect, useState } from "react";
import "@fontsource/inter";
import { ethers, BigNumber } from "ethers";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import {
  formatEther,
  formatUnits,
  parseUnits,
  parseEther,
} from "@ethersproject/units";
import { preProcessFile } from "typescript";
import { contractCallOutOfGasMock } from "@usedapp/testing";
import { Interface } from "@ethersproject/abi";
import "./App.css";

//contracts and ABI's
const Offer_Factory_ABI = [
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
const Offer_Factory_ADD = "0x45e9668Ad6a5fC79b860e82AfAE1F3BBcf5B0fC6";
const Lens_ABI = [
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
const Lens_ADD = "0xbb6692D85fF5E4269E78B7E64919e2c994dc9104";
const LockedWETHOffer_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenWanted",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountWanted",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "WETHAmount",
        type: "uint256",
      },
    ],
    name: "OfferCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "WETHAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "OfferFilled",
    type: "event",
  },
  {
    inputs: [],
    name: "amountWanted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hasEnded",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "seller",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenWanted",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "hasWETH",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    name: "mulDiv",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];
let provider = new ethers.providers.JsonRpcProvider(
  "https://ropsten.infura.io/v3/93c6f5f4400c471da81104e6b61bf9f5"
);
let Lens_READ = new ethers.Contract(Lens_ADD, Lens_ABI, provider);

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ActiveOfferInfo, setActiveOfferInfo] = useState<any[]>([]);
  const [AddressList, setAddressList] = useState<any[]>([]);
  const [WETHBalances, setWETHBalances] = useState<any[]>([]);
  const [TokenWanted, setTokenWanted] = useState<any[]>([]);
  const [amountWanted, setamountWanted] = useState<any[]>([]);
  const [order_array, setorder_array] = useState<any[]>([]);
  const [sorted_array, setsorted_array] = useState<any[]>([]);
  const [Interface_Array, setInterface_Array] = useState<any[]>([]);
  const [Token_Ticker, setToken_Ticker] = useState<any[]>([]);
  const [PPW, setPPW] = useState<any[]>([]);
  const [approval, setApproval] = useState<any[]>([]);
  let ActiveOffers = ActiveOfferInfo.length;
  const USDC = 0xa3f8e2fee6e754617e0f0917a1ba4f77de2d9423;
  useEffect(() => {
    const init = async () => {
      //CONTRACT READING
      const ActiveOfferInfo = await Lens_READ.getAllActiveOfferInfo(
        Offer_Factory_ADD
      );
      //BREAKING DOWN THE ORDER
      const AddressList = ActiveOfferInfo[0];
      const WETHBalances = ActiveOfferInfo[1];
      const TokenWanted = ActiveOfferInfo[2];
      const amountWanted = ActiveOfferInfo[3];
      const PPW = [];

      //CALCULATING PRICE PER WETH

      for (let j = 0; j <= ActiveOffers; j++) {
        let ppwValue = amountWanted[j] / WETHBalances[j];
        PPW.push(ppwValue);
      }

      //CREATING AN ARRAY OF ORDERS

      let order_array = [];
      for (let k = 0; k <= ActiveOffers; k++) {
        if (TokenWanted[k] == USDC) {
          order_array.push([
            PPW[k],
            AddressList[k],
            WETHBalances[k],
            amountWanted[k],
            TokenWanted[k],
          ]);
        } else {
          continue;
        }
      }
      //SORTING THE ARRAY BY PRICE PER WETH
      const approval = async (weth_offer_add, amountwantedbyoffer) => {
        let abi = [
          "function approve(address _spender, uint256 _value) public returns (bool success)",
        ];
        let contract = new ethers.Contract(String(USDC), abi, provider);
        const ActiveOfferInfo = await contract.approve(
          weth_offer_add,
          amountwantedbyoffer
        );
      };

      const sorted_array = order_array.sort((a, b) => b[0] - a[0]);
      console.log(sorted_array);

      setActiveOfferInfo(ActiveOfferInfo);
      setAddressList(AddressList);
      setWETHBalances(WETHBalances);
      setTokenWanted(TokenWanted);
      setamountWanted(amountWanted);
      setorder_array(order_array);
      setPPW(PPW);
      setsorted_array(sorted_array);
      setToken_Ticker(Token_Ticker);
      setInterface_Array(Interface_Array);
    };
    init();
  }, []);

  return (
    // <ChakraProvider
    // theme={theme}
    // >
    <Layout>
      <main>
        <div className="main-header">
          <h1 className="header-text">dOTC prototype site</h1>
          <ConnectButton handleOpenModal={onOpen} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </div>
        {/* <Button>
          dOTC
        </Button> */}
        <div className="main-content">
          <button type="button" className="view-market-btn">
            Create Offer
          </button>
          <div className="market-view">
            <div className="market-table">
              <Table>
                <Thead>
                  {/* table header row */}
                  <Tr className="header-row">
                    <Th>Offer Contract</Th>
                    <Th>Price Per WETH</Th>
                    <Th>WETH Deposited</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sorted_array?.map((item, index) => (
                    <Tr className="reg-row" key={index}>
                      {/* first cell for each reg table row */}
                      <Td>
                        <Link
                          className="link"
                          href={`https://ropsten.etherscan.io/address/${item[1]}`}
                        >
                          {/* <Button type="button"> */}
                          {/* if you need these to be buttons you can uncomment, don't need to be buttons unless they redirect somewhere or do something tho */}
                          {item[1] &&
                            `${item[1].slice(0, 6)}...${item[1].slice(
                              item[1].length - 4,
                              item[1].length
                            )}`}
                          {/* </Button> */}
                        </Link>
                      </Td>
                      {/* second cell for each reg table row */}
                      <Td height="25px">
                        {/* <Button type="button"> */}$
                        {Number(item[0] * 1e18).toFixed(2)}
                        {/* </Button> */}
                      </Td>
                      {/* third cell for each reg table row */}
                      <Td height="25px">
                        {/* <Button type="button"> */}
                        {formatEther(item[2])}
                        {/* </Button> */}
                      </Td>
                      {/* fourth cell for each reg table row */}
                      <Td height="25px">
                        <button
                          type="button"
                          // onClick={approval(item[1], formatUnits(item[3]))}
                        >
                          Approve USDC
                        </button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </Layout>
    // </ChakraProvider>
  );
}

export default App;
