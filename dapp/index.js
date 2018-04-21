// 'use strict'

//var Web3 = require('web3');

window.addEventListener('load', function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3 = new Web3(web3.currentProvider);
        console.log('metamask');
        Contract = ContractABI.at('0xc6fe6729522b576204fae6b8de9f9bda26ab89fb');
        console.log(Contract);
    } else {
        console.log('No web3? You should consider trying MetaMask!');
        document.getElementById('meta-mask-required').innerHTML = 'You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example';

        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log('local');
        console.log(web3);
    }

    var event = Contract.BuyToken()
    // watch for event of BuyToken
    event.watch(function(error, result){
      if (!error)
        console.log(result);
        getBalance();
    });

});



function buyToken () {
    var price = Number(document.getElementById('buyTokenAmount').value);
    var tx = {
        from: web3.eth.coinbase,
        to: Contract.address,
        value: web3.toWei(price, 'ether'),
    };

    web3.eth.sendTransaction(tx, function(err, res){
        console.log(res);
        console.log(err);
        document.getElementById('loader').hidden = false;
    });

    // 새 블록 mining 될 때 마다 callback 호출
    web3.eth.filter('latest', function(error1, result1){ // waiting mining for pending tx
        getBalance();
    });

}


function getBalance() {
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
            document.getElementById("mytoken").innerText = balance.toString();
            document.getElementById('loader').hidden = true;
        }
        else{
            console.error(error);
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('buyToken').onclick = buyToken;
    document.getElementById('watch').onclick = getBalance;
});


var ContractABI = web3.eth.contract(
    [
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
    	},
    	{
    		"constant": true,
    		"inputs": [],
    		"name": "rate",
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
    		"constant": false,
    		"inputs": [],
    		"name": "buyToken",
    		"outputs": [],
    		"payable": true,
    		"stateMutability": "payable",
    		"type": "function"
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
    		"payable": true,
    		"stateMutability": "payable",
    		"type": "fallback"
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
    		"name": "BuyToken",
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
    	}
    ]
);

var Contract;
