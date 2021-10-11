/* 

使用web3调用交易
首先需要npm install web3

*/

// 引入web3
const Web3 = require('web3');

/*
   -- Define Provider & Variables --
*/
// 创建Provider
// 一个是本地，一个是测试网
const providerRPC = {
   development: 'http://localhost:9933',
   moonbase: 'https://rpc.testnet.moonbeam.network',
};

//选择指定的网络，这里是选择moonbase
const web3 = new Web3(providerRPC.moonbase); 

// 存储要发款的私钥和地址
const account_from = {
   privateKey: 'd3a034dbf9a47dd5d39b69d8f515daf6d442f43804d967823194f86e66f6adf3',
   address: '0x385105e8233401740724782Bb1B147C457AdC143',
};

// 收款地址
const addressTo = '0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac'; // Change addressTo

/*
   -- Create and Deploy Transaction --
*/
const deploy = async () => {
   console.log(
      `Attempting to send transaction from ${account_from.address} to ${addressTo}`
   );

   // Sign Tx with PK
   // 创建交易
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         gas: 21000,
         to: addressTo,
         value: web3.utils.toWei('2', 'ether'), //转移两个代币
      },
      account_from.privateKey
   );

   // Send Tx and Wait for Receipt
   // 发送交易
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(
      `Transaction successful with hash: ${createReceipt.transactionHash}`
   );
};

deploy();