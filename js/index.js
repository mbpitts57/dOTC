// import { detectEthereumProvider } from "./detect.js";
const ethereumButton = document.querySelector(".enableEthereumButton");
// const Web3 = require("web3"); commented bc gave error in browser console
const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
};

var marketButton = document.querySelector(".view-market-btn");
var marketView = document.querySelector(".market-view");
// import detectEthereumProvider from "@metamask/detect-provider";

// begin eth code -------------------------------------------------------------------------------------------
// from Metamask docs
ethereumButton.addEventListener("click", () => {
  // Will start the metamask extension
  ethereum.request({ method: "eth_requestAccounts" });
  console.log(
    "clicked 'Connect Wallet'. Metamask pops up if user has it installed."
  );
});

// // /**/
// // / Detect the MetaMask Ethereum provider /
// // /**/

// // this returns the provider, or null if it wasn't detected
// // const provider = await detectEthereumProvider(); commented bc gave error in browser console

// if (provider) {
//   startApp(provider); // Initialize your app
// } else {
//   console.log("Please install MetaMask!");
// }

// function startApp(provider) {
//   // If the provider returned by detectEthereumProvider is not the same as
//   // window.ethereum, something is overwriting it, perhaps another wallet.
//   if (provider !== window.ethereum) {
//     console.error("Do you have multiple wallets installed?");
//   }
//   // Access the decentralized web!
// }

// /**/
// /* Handle chain (network) and chainChanged (per EIP-1193) /
// /**/

// // const chainId = await ethereum.request({ method: "eth_chainId" }); commented bc gave error in browser console
// handleChainChanged(chainId);

// ethereum.on("chainChanged", handleChainChanged);

// function handleChainChanged(_chainId) {
//   // We recommend reloading the page, unless you must do otherwise
//   window.location.reload();
// }

// /**/
// /* Handle user accounts and accountsChanged (per EIP-1193) /
// /**/

// let currentAccount = null;
// ethereum
//   .request({ method: "eth_accounts" })
//   .then(handleAccountsChanged)
//   .catch((err) => {
//     // Some unexpected error.
//     // For backwards compatibility reasons, if no accounts are available,
//     // eth_accounts will return an empty array.
//     console.error(err);
//   });

// // let currentAccount = null; commented bc gave error in browser console
// ethereum
//   .request({ method: "eth_accounts" })
//   .then(handleAccountsChanged)
//   .catch((err) => {
//     // Some unexpected error.
//     // For backwards compatibility reasons, if no accounts are available,
//     // eth_accounts will return an empty array.
//     console.error(err);
//   });
// // Note that this event is emitted on page load.
// // If the array of accounts is non-empty, you're already
// // connected.
// ethereum.on("accountsChanged", handleAccountsChanged);

// // For now, 'eth_accounts' will continue to always return an array
// function handleAccountsChanged(accounts) {
//   if (accounts.length === 0) {
//     // MetaMask is locked or the user has not connected any accounts
//     console.log("Please connect to MetaMask.");
//   } else if (accounts[0] !== currentAccount) {
//     currentAccount = accounts[0];
//     // Do any other work!
//   }
// }

// // /**/
// // / Access the user's accounts (per EIP-1102) /
// // /**/

// // You should only attempt to request the user's accounts in response to user
// // interaction, such as a button click.
// // Otherwise, you popup-spam the user like it's 1999.
// // If you fail to retrieve the user's account(s), you should encourage the user
// // to initiate the attempt.
// document.getElementById("connectButton", connect);

// // While you are awaiting the call to eth_requestAccounts, you should disable
// // any buttons the user can click to initiate the request.
// // MetaMask will reject any additional requests while the first is still
// // pending.
// function connect() {
//   ethereum
//     .request({ method: "eth_requestAccounts" })
//     .then(handleAccountsChanged)
//     .catch((err) => {
//       if (err.code === 4001) {
//         // EIP-1193 userRejectedRequest error
//         // If this happens, the user rejected the connection request.
//         console.log("Please connect to MetaMask.");
//       } else {
//         console.error(err);
//       }
//     });
// }

// end eth code -------------------------------------------------------------------------------------------

// hides the 'Show Market' button and shows the live market view.
function showMarket() {
  marketButton.style.display = "none";
  marketView.style.display = "flex";
  console.log("clicked 'Show Market.' hide button, show market.");
}

// optional typewriter animation needs work
document.addEventListener("DOMContentLoaded", function (event) {
  // array with texts to type in typewriter
  var dataText = ["dOTC prototype site"];

  // start a typewriter animation for a text in the dataText array
  function StartTextAnimation(i) {
    if (typeof dataText[i] == "undefined") {
      setTimeout(function () {
        StartTextAnimation(0);
      }, 20000);
    }
    // check if dataText[i] exists
    if (i < dataText[i].length) {
      // text exists! start typewriter animation
      typeWriter(dataText[i], 0, function () {});
    }

    typeWriter(dataText[i], 0, function () {
      // after callback (and whole text has been animated), start next text
    });
  }

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < text.length) {
      // add next character to h1
      document.querySelector("h2").innerHTML =
        text.substring(0, i + 1) +
        '<span class="animation" id="animation" aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    }
  }

  // start the text animation
  // StartTextAnimation(0);
});
