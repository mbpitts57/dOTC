// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// const ethereumButton = document.querySelector(".enableEthereumButton");
var marketButton = document.querySelector(".view-market-btn");
var marketView = document.querySelector(".market-view");
// const provider = new ethers.providers.Web3Provider(window.ethereum);

// // from Metamask docs
// ethereumButton.addEventListener("click", () => {
//   // Will start the metamask extension
//   ethereum.request({ method: "eth_requestAccounts" });
//   console.log(
//     "clicked 'Connect Wallet'. Metamask pops up if user has it installed."
//   );
// });

// hides the 'Show Market' button and shows the live market view.
function showMarket() {
  marketButton.style.display = "none";
  marketView.style.display = "flex";
  console.log("clicked 'Show Market.' hide button, show market.");
}

// // optional typewriter animation needs work
// document.addEventListener("DOMContentLoaded", function (event) {
//   // array with texts to type in typewriter
//   var dataText = ["dOTC prototype site"];

//   // start a typewriter animation for a text in the dataText array
//   function StartTextAnimation(i) {
//     if (typeof dataText[i] == "undefined") {
//       setTimeout(function () {
//         StartTextAnimation(0);
//       }, 20000);
//     }
//     // check if dataText[i] exists
//     if (i < dataText[i].length) {
//       // text exists! start typewriter animation
//       typeWriter(dataText[i], 0, function () {});
//     }

//     typeWriter(dataText[i], 0, function () {
//       // after callback (and whole text has been animated), start next text
//     });
//   }

//   // type one text in the typwriter
//   // keeps calling itself until the text is finished
//   function typeWriter(text, i, fnCallback) {
//     // chekc if text isn't finished yet
//     if (i < text.length) {
//       // add next character to h1
//       document.querySelector("h2").innerHTML =
//         text.substring(0, i + 1) +
//         '<span class="animation" id="animation" aria-hidden="true"></span>';

//       // wait for a while and call this function again for next character
//       setTimeout(function () {
//         typeWriter(text, i + 1, fnCallback);
//       }, 100);
//     }
//   }

//   // start the text animation
//   // StartTextAnimation(0);
// });