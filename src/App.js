import "./css/App.css";
import "./config.js";
const Web3 = require('web3');
const rpcUrl = "https://ropsten.infura.io/v3/93c6f5f4400c471da81104e6b61bf9f5";
const web3 = new Web3(rpcUrl);

async function GetAllActiveOffers(host, OFFER_LENS_ABI, OFFER_LENS_ADD) {
  const contractInstance = new web3.eth.Contract(
    OFFER_LENS_ABI,
    OFFER_LENS_ADD
  );
  const offerList = await contractInstance.methods
    .getAllActiveOfferInfo(0x45e9668ad6a5fc79b860e82afae1f3bbcf5b0fc6)
    .call();

  function logOffers() {
    console.log(offerList);
  }
  return (
    // <button onClick={logOffers}>Console Log all Offers</button>
    <div>test</div>
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
