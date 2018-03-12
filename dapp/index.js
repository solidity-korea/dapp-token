// 'use strict'

var Web3 = require('web3');

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
