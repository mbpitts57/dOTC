import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";
// import "../App.css";

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <Box
      // display="flex"
      // alignItems="center"
      // background="gray.700"
      // borderRadius="xl"
      // py="0"
    >
      <Box px="3">
        <Text color="green.200" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
      <button
      className="connect-wallet-btn"
        onClick={handleOpenModal}
        // bg="gray.800"
        // _hover={{
        //   border: "1px",
        //   borderStyle: "solid",
        //   borderColor: "blue.400",
        //   backgroundColor: "gray.700",
        // }}
        // m="1px"
        // px={3}
        // height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </button>
    </Box>
  ) : (
    <button
      className="connect-wallet-btn"
      onClick={handleConnectWallet}
      
      // _hover={{
      //   borderColor: "blue.700",
      //   color: "blue.400",
      // }}
      // _active={{
      //   backgroundColor: "blue.800",
      //   borderColor: "blue.700",
      // }}
    >
      Connect to a wallet
    </button>
  );
}