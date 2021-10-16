const fs = require('fs');
const path = require('path');
const solc = require('solc');

// Get Path and Load Contract
// 读取合约文件
const configPath = path.join(__dirname, '../Contracts/Incrementer.sol')
const source = fs.readFileSync(configPath, 'utf8');

// Compile Contract
const input = {
    language: 'Solidity',
    sources: {
        'Incrementer.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
            '*': ['*'],
            },
        },
    },
};
// 编译合约，到一个json文件
const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
// 把json文件存储到一个变量contractFile，以供使用
const contractFile = tempFile.contracts['Incrementer.sol']['Incrementer'];

// Export Contract Data
module.exports = contractFile;