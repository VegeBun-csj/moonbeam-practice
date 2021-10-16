#### 监听事件

注意： 监听事件使用的是web socket端口

`web3.eth.subscribe` 方法可以订阅区块链中的指定事件
`web3.eth.subscribe(type [, options] [, callback]);`
参数:
- String - 订阅类型

- Mixed - (可选) 依赖于订阅类型的可选额外参数

- Function - (可选) 可选的回调函数，其第一个参数为错误对象，第二个参数为结果。该函数在每次订阅事件发生时都会被调用，订阅实例会作为第三个参数传递进来。


#### 监听事件的使用：
1. blockheader.js 用来监听链上区块数据
    moonbase alpha上出块时间是12s
    miner和author通常是同一个地址

2. contract-events.js 用来监听合约数据
    监听事件时，显示了data数据部分，这里来解析一下data的内容（以实例中的data字段为例）
    data:'0x000000000000000000000000385105e8233401740724782bb1b147c457adc1430000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000b'
    其中以0为分割点，可以看到：
    （1）发送人地址为：385105e8233401740724782bb1b147c457adc143
    （2）value : 3 (16进制中的3) 这里是给合约增加的number
    （3）updated_number: b (16进制中的11) 即合约中当前的number为11

    注意：实例中可能出现错误：connection dropped by remote peer
    原因是使用的moonbase alpha的公用端点，所以监听有限制
    解决方法：使用专业的RPC端点API，比如onFinality，或者自己运行节点
