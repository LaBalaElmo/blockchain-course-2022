import React, { useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { connectWallet, initialize } from './ethereum/web3';
//import contractLottery from "./ethereum/abis/Main.json";
import contractLottery from "./ethereum-hardhat/artifacts/src/ethereum-hardhat/contracts/Main.sol/Main.json";

function App() {
    const [contract, setContract] = useState<any>('')
    const [message, setMessage] = useState<any>('');
    const [balanceAccount, setBalanceAccount] = useState<any>('');

    const [valor1, setValor1] = useState<any>('');
    const [valor2, setValor2] = useState<any>('');
    const [valor3, setValor3] = useState<any>('');
    const [valor4, setValor4] = useState<any>('');
    const [valor5, setValor5] = useState<any>('');
    const [valor6, setValor6] = useState<any>('');

    const [total, setTotal] = useState<any>('');

    const [addressContract, setaddressContract] = useState<any>('');
    const [precio, setPrecio] = useState<any>('');

    const [p, setP] = useState<any>('');
    // @ts-ignore
    const handleChange1 = event => {
        setValor1(event.target.value);
    };

    // @ts-ignore
    const handleChange2 = event => {
        setValor2(event.target.value);
    };

    // @ts-ignore
    const handleChange3 = event => {
        setValor3(event.target.value);
    };

    // @ts-ignore
    const handleChange4 = event => {
        setValor4(event.target.value);
    };

    // @ts-ignore
    const handleChange5 = event => {
        setValor5(event.target.value);
    };

    // @ts-ignore
    const handleChange6 = event => {
        setValor6(event.target.value);
    };
    /*
    let valor1: string = '';
    let valor2: string = '';
    let valor3: string = '';
    let valor4: string = '';
    let valor5: string = '';
    let valor6: string = '';
*/ //componentDidMount(){
  //}

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
  //const networkData = contractLottery.networks["5777"];
  const abi = contractLottery.abi;
  const address = "0x2c96735A22838778EEfAd4470C434FCA078D22B4";
  const contractDeployed = new Web3.eth.Contract(abi, address);
  setaddressContract(await contractDeployed.methods.getContractAddress().call());
  setContract(contractDeployed);
};

const onEnter = async () => {
  //@ts-ignore
  const Web3 = window.web3;

  const accounts = await Web3.eth.getAccounts();

  //await contract.methods.enter().send({
    //from: accounts[0],
    //value: Web3.utils.toWei(value, "ether")
  //});
};

/*
const getBalanceAccount = async (address: any) => {
    //@ts-ignore
    const Web3 = window.web3;
    const balance = await contract.balanceAccount(address);
    setBalanceAccount(balance);
};
*/
    //@ts-ignore
    const buyTokens = async (client, amount, pay) => {
        //@ts-ignore
        const Web3 = window.web3;
        const accounts = await Web3.eth.getAccounts();

        await contract.methods.buyTokens(client, amount).send({
            from: accounts[0],
            value: Web3.utils.toWei(pay, "ether")});

    }

    //@ts-ignore
    const getbalanceAccount = async (account) => {
        const p = await contract.methods.balanceAccount(account).call()
        setP(p)
    }

    const getTotalSupply = async () => {
        const supply = await contract.methods.getTotalSupply().call();
        setTotal(supply);
    }

    //@ts-ignore
    const generateTokens = async (amount) => {
        //@ts-ignore
        const Web3 = window.web3;
        const accounts = await Web3.eth.getAccounts();
        await contract.methods.generateTokens(amount).send({from: accounts[0]});
    }

    //@ts-ignore
    const priceTokens = async (amount) => {
        const price = await contract.methods.priceTokens(amount).call();
        setPrecio(price/1000000000000000000);
    }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>C-COIN</p>

          <button onClick={() => connectWallet()} className="btn btn-success">Connect</button>


          <div className="container">
              <h4>Comprar tokens ERC-20</h4>
              <input type="number" placeholder="Monto de ethereum para pagar" onChange={handleChange1} value={valor1}/>
              <input type="text" placeholder="Direccion de destino" onChange={handleChange2} value={valor2}/>
              <input type="number" placeholder="Cantidad de tokens a comprar (1 token = 1 Ether)" onChange={handleChange3} value={valor3}/>
              <button onClick={() => buyTokens(valor2, valor3, valor1)}>Comprar tokens</button>
          </div>

          <br/>
          <br/>

          <div>
              <h4>Balance de tokens de un usuario</h4>
              <input type="text" placeholder="Direccion del usuario" onChange={handleChange4} value={valor4}/>
              <p>La cantidad de tokens es: {p}</p>
              <button onClick={() => getbalanceAccount(valor4)}> BALANCE DE TOKENS</button>
          </div>

          <br/>
          <br/>
          <div>
              <h4>Balance total de tokens del Smart Contract</h4>
              <p>La cantidad total de tokens es: {total} </p>
              <button onClick={() => getTotalSupply()}> BALANCE DE TOKENS</button>
          </div>

          <br/>
          <br/>
          <div>
              <h4>Añadir nuevos Tokens</h4>
              <input type="text" placeholder="Cantidad de tokes a incrementar" onChange={handleChange5} value={valor5}/>
              <button onClick={() => generateTokens(valor5)}> INCREMENTO DE TOKENS</button>
          </div>

          <br/>
          <br/>
          <div>
              <h4>Direccion del smart contract en Goerli</h4>
              <p>{addressContract}</p>
          </div>

          <br/>
          <br/>
          <div>
              <h4>Calcular precio de tokens en ETH</h4>
              <input type="text" placeholder="Cantidad de tokens" onChange={handleChange6} value={valor6}/>
              <p>El precio de {valor6} es {precio}</p>
              <button onClick={() => priceTokens(valor6)}> CALCULAR PRECIO</button>
          </div>


      </header>
    </div>
  );
}

export default App;

