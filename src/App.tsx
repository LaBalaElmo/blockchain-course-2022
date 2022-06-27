import React, { useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { connectWallet, initialize } from './ethereum/web3';
//import contractLottery from "./ethereum/abis/Lottery.json";
//import contractLottery from "./ethereum-hardhat/artifacts/src/ethereum-hardhat/contracts/Lottery.sol/Lottery.json";

function App() {



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>C-COIN</p>
      </header>
    </div>
  );
}

export default App;


