const Web3 = require('web3');
const { abi } = require('../deployContract/compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
    development: 'http://localhost:9933',
    moonbase: 'https://rpc.testnet.moonbeam.network',
};
const web3 = new Web3(providerRPC.moonbase); //Change to correct network

// 发送交易的账户的私钥
const account_from = {
    privateKey: 'd3a034dbf9a47dd5d39b69d8f515daf6d442f43804d967823194f86e66f6adf3',
};

// 需要操作的合约的地址
const contractAddress = '0x5a70c5837339c45CA7d4250f2A52E8178521c30C';

// 设定一个数值，后面要增加到合约中的数值
const _value = 3;

/*
   -- Send Function --
*/
// Create Contract Instance（获取合约实例）
const incrementer = new web3.eth.Contract(abi, contractAddress);

// Build Increment Tx（创建交易）
const incrementTx = incrementer.methods.increment(_value);

const increment = async () => {
    console.log(
        `Calling the increment by ${_value} function in contract at address: ${contractAddress}`
    );

    // Sign Tx with PK
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            to: contractAddress,
            data: incrementTx.encodeABI(),
            gas: await incrementTx.estimateGas(),
        },
        account_from.privateKey
    );

    // Send Tx and Wait for Receipt
    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    );
    console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

increment();