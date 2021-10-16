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

// 获取合约实例
const incrementer = new web3.eth.Contract(abi, contractAddress);

// 使用实例构建指定方法的交易
const resetTx = incrementer.methods.reset();

const reset = async () => {
    console.log(`start rest the number to 0`);

    // Sign Tx with PK
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            to: contractAddress,
            data: resetTx.encodeABI(),
            gas: await resetTx.estimateGas(),
        },
        account_from.privateKey
    );

        // Send Tx and Wait for Receipt
        const createReceipt = await web3.eth.sendSignedTransaction(
            createTransaction.rawTransaction
        );
        console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
}

reset();