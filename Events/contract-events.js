const Web3 = require('web3');
const web3 = new Web3('wss://wss.testnet.moonbeam.network');

// 监听合约事件
web3.eth.subscribe('logs', {
    address: '0x5a70c5837339c45CA7d4250f2A52E8178521c30C',
    // 订阅事件的主题，如果这个topic是空，则是监听这个合约上的所有事件
    // 如果是监听某个事件，则需要在topics中加上这个事件的topic的hash
    /*
    计算以太坊Event Topic哈希的方法
    1. 获取事件的签名
        以Incrementer.sol合约中的事件：event Increment(address who, uint256 value, uint256 updated_number);为例
        它的签名为： Increment(address,uint256,uint256)   (即保留事件名以及其中的参数类型，其中不留空白以及最后的分号，因为我们要计算这个签名的哈希)

    2. 计算事件签名的Keccak-256哈希
        （1）方法一：可以通过https://emn178.github.io/online-tools/keccak_256.html 在线计算出哈希值
        （2）方法二：在代码中通过web3.utils中相应的方法来进行计算
            keccak-256("Increment(address,uint256,uint256)") = "64f50d594c2a739c7088f9fc6785e1934030e17b52f1a894baec61b98633a59f"
     */

    // 注意在哈希值前面加上0x
    topics: ['0x64f50d594c2a739c7088f9fc6785e1934030e17b52f1a894baec61b98633a59f']
}, (error, result) => {
    if (error)
        console.error(error);
})
    .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
    })
    .on("data", function (log) {
        console.log(log);
    });