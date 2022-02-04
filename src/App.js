import "./css/App.css";
import "./config.js";
// const Web3 = require('web3');
// const rpcUrl = "https://ropsten.infura.io/v3/93c6f5f4400c471da81104e6b61bf9f5";
// const web3 = new Web3(rpcUrl);
const { ethers } = require("ethers");

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

async function GetAllActiveOffers(OFFER_LENS_ABI, OFFER_LENS_ADD, provider) {
  const contractInstance = new ethers.Contract(OFFER_LENS_ADD, OFFER_LENS_ABI, provider);

  const offerList = await contractInstance.getActiveOffers();
  // const offerListString = JSON.stringify(offerList);

  function logOffers() {
    console.log(offerList);
  }

  return (
    <div className="GetAllActiveOffers">
    <button onClick={logOffers}>Console Log all Offers</button>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default GetAllActiveOffers;
