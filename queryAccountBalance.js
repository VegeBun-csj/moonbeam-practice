/* 

使用web3查询账户余额

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

// 这里选择查询指定的账户余额，单位是wei
let myAccount = "0x385105e8233401740724782Bb1B147C457AdC143"
web3.eth.getBalance(myAccount).then((balances) => {
    console.log(`查询账户${myAccount}的余额为${balances}`); 
})
