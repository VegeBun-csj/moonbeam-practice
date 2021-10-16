const Web3 = require('web3');
const contractFile = require('./compile');

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
const account_from = {
    privateKey: 'd3a034dbf9a47dd5d39b69d8f515daf6d442f43804d967823194f86e66f6adf3',
    address: '0x385105e8233401740724782Bb1B147C457AdC143',
};

// bytecode和ABI
// ×××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××
// 合约的字节代码，用于EVM虚拟机进行读取
const bytecode = contractFile.evm.bytecode.object;
// 合约的二进制接口，包括合约的方法，事件等等
const abi = contractFile.abi;
// ×××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××

/*
    -- 部署合约 --
*/
const deploy = async () => {
    console.log(`Attempting to deploy from account ${account_from.address}`);

    // 创建合约实例
    const incrementer = new web3.eth.Contract(abi);

    // 构造创建合约的Constructor的实例
    const incrementerTx = incrementer.deploy({
        data: bytecode,
        arguments: [5],   //初始值设置为5
    });

    // Sign Transacation and Send（签署交易）
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            data: incrementerTx.encodeABI(),
            gas: await incrementerTx.estimateGas(),    //估算部署合约的gas(建议使用函数来进行估算，不要手写)
        },
        account_from.privateKey
    );

    // Send Tx and Wait for Receipt（收据）
    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    );
    console.log(
        `Contract deployed at address: ${createReceipt.contractAddress}`
    );
};

deploy();