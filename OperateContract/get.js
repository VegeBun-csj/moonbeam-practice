const Web3 = require('web3');
const { abi } = require('../deployContract/compile.js');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
    development: 'http://localhost:9933',
    moonbase: 'https://rpc.testnet.moonbeam.network',
};
const web3 = new Web3(providerRPC.moonbase); //Change to correct network

// Variables
// 合约地址
const contractAddress = '0x5a70c5837339c45CA7d4250f2A52E8178521c30C';

/*
   -- Call Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

const get = async () => {
    console.log(`Making a call to contract at address: ${contractAddress}`);

    // Call Contract
    // 调用合约的方法
    const data = await incrementer.methods.number().call();

    console.log(`The current number stored is: ${data}`);
};

get();