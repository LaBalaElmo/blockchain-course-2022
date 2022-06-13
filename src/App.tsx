import React, { useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { connectWallet, initialize } from './ethereum/web3';
import contractLottery from "./ethereum/abis/Lottery.json";

function App() {

  const [contract, setContract] = useState<any>('')

  //
  const [manager, setManager] = useState<any>('')
  const [players, setPlayers] = useState<any>([])
  const [balance, setBalance] = useState<any>('')

  /*
  componentDidMount(){
  }
   */
  useEffect(() => {
    // @ts-ignore
    if(window.web3){
      initialize();
      loadBlockChainData();
    }
  }, []);

  const loadBlockChainData = async () => {

    //@ts-ignore
    const Web3 = window.web3;
    const networkData = contractLottery.networks["5777"];
    console.log('networkData', networkData)

    if(networkData){
      const abi = contractLottery.abi;
      const address = networkData.address;
      console.log('address', address);

      const contractDeployed = new Web3.eth.Contract(abi, address);

      const players = await contractDeployed.methods.getPlayers().call();
      setPlayers(players);

      const manager = await contractDeployed.methods.manager().call();
      setManager(manager);

      const balance = await Web3.eth.getBalance(contractDeployed.options.address);
      setBalance(balance);

      setContract(contractDeployed);

      const balance2 = await Web3.eth.getBalance(address);
      console.log("balance", balance2)
    }
    //Rinkeby 4, Ganache 5777, BSC 97
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Hi React, Truffle, Firebase</p>
        <button onClick={()=> connectWallet()}>Connect</button>

        <p>PLAYERS {players.length}</p>
        <p>BALANCE {balance}</p>
        <p>MANAGER {manager}</p>

      </header>
    </div>
  );
}

export default App;
