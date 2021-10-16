const Web3 = require('web3');
// 注意：这里使用的websocket端点而不是http端点
const web3 = new Web3('wss://wss.testnet.moonbeam.network');

//监听链上数据
web3.eth.subscribe('newBlockHeaders', (error, result) => {
    if (error)
        console.error(error);
}) 
    .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
    })
    .on("data", function (log) {
        console.log(log);
    });