// 'use strict'

//var Web3 = require('web3');

var ContractABI = web3.eth.contract(
    [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "msgValue",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "totalSupply",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "msgSender",
                    "type": "address"
                }
            ],
            "name": "Deposit",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
);

var Contract;

window.addEventListener('load', function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3 = new Web3(web3.currentProvider);
        console.log('metamask');
        Contract = ContractABI.at('0x20817d1874b089c85b2ec3784917cafb92f3cd0d');
        console.log(Contract);
    } else {
        console.log('No web3? You should consider trying MetaMask!');
        document.getElementById('meta-mask-required').innerHTML = 'You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example';

        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log('local');
        console.log(web3);
    }

});



function buyToken () {
    var price = Number(document.getElementById('buyTokenAmount').value);
    var tx = {
        from: web3.eth.coinbase,
        to: Contract.address,
        value: web3.toWei(price, 'ether'),
    };
    Contract.deposit.sendTransaction(tx, function(err, res){
        console.log(res);
        console.log(err);
        document.getElementById('loader').hidden = false;
    });
    var depositEvent = Contract.Deposit();

    web3.eth.filter('latest', function(error1, result1){ // waiting mining for pending tx
        depositEvent.watch(function(error, result){
            if(!error){
                watchBalance();
            }
        });
    });

}


function watchBalance() {
    var coinbase = web3.eth.coinbase;
    document.getElementById('coinbase').innerText = 'coinbase: ' + coinbase;

    web3.eth.getBalance(coinbase, function(error, result){
        if(!error){
            var originalBalance = web3.fromWei(result, 'ether').toNumber();
            document.getElementById("current").innerText = originalBalance.toString();
        }
        else{
            console.error(error);
        }
    });
    Contract.balanceOf(web3.eth.coinbase, function(error, result){
        if(!error){
            console.log(result);
            balanceMyToken = result;
            var balance = result['c'][0] / Math.pow(10, 4);
            document.getElementById("burrowcoin").innerText = balance.toString();
            document.getElementById('loader').hidden = true;
        }
        else{
            console.error(error);
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('buyToken').onclick = buyToken;
    document.getElementById('watch').onclick = watchBalance;
});
