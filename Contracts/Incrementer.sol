// SPDX-License-Identifier: MIT
/// @title increment
/// @author csj
pragma solidity ^0.8.0;

contract Incrementer {

    uint256 public number;
    // 对数字进行增加的时候触发事件（是谁增加的，增加了多少，增加后是多少）
    event Increment(address who, uint256 value, uint256 updated_number);
    
    // 是谁进行了reset
    event Reset(address who);

    constructor(uint256 _initialNumber) {
        number = _initialNumber;
    }

    function increment(uint256 _value) public {
        number = number + _value;
        emit Increment(msg.sender, _value, number);
    }

    function reset() public {
        number = 0;
        emit Reset(msg.sender);
    }

}