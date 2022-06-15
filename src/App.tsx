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

  const [value, setValue] = useState<any>('');

  const [message, setMessage] = useState<any>('');
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

      //const balance2 = await Web3.eth.getBalance(address);
      //console.log("balance", balance2)
    }
    //Rinkeby 4, Ganache 5777, BSC 97
  };

  const loadBalance = async () => {
    //@ts-ignore
    const Web3 = window.web3;
    const balance = await Web3.eth.getBalance(contract.options.address);
    setBalance(balance);
  }

  const loadPlayers = async () => {
    const players = await contract.methods.getPlayers().call();
    setPlayers(players);
  };

  const onEnter = async () => {
    //@ts-ignore
    const Web3 = window.web3;

    const accounts = await Web3.eth.getAccounts();

    setMessage("Waiting on transaction success..");
    await contract.methods.enter().send({
      from: accounts[0],
      value: Web3.utils.toWei(value, "ether")
    });
    setMessage("you have entered")

    loadBalance();
    loadPlayers();
  };

  const onPickWinner = async () => {
    //@ts-ignore
    const Web3 = window.web3;
    const  accounts = await Web3.eth.getAccounts();
    setMessage("waiting on transaction success ...")

    contract.methods.pickWinner().send({
      from: accounts[0]
    });

    setMessage("A winner has been picked");
    loadBalance();
    loadPlayers();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Deployed on Ganache Network</p>
        <button onClick={()=> connectWallet()} className="btn btn-success">Connect</button>

        <button onClick={() => onPickWinner()} className="btn btn-success"> Pick winner </button>

        <p>PLAYERS {players.length}</p>
        <p>BALANCE {balance}</p>
        <p>MANAGER {manager}</p>

        <label>Monto minimo mayor a 2 ETH</label>
        <input type="text" placeholder="Monto en ether" value={value} onChange={(event) => {setValue(event.target.value)}} />
        <button onClick={() => {onEnter()}} className="btn btn-warning">Enter</button>

        <p> {message}</p>
      </header>
    </div>
  );
}

export default App;
