const {Blockchain,Transaction}=require("./BlockChain");
let yash2108 = new Blockchain();
yash2108.createTransaction(new Transaction('address1', 'address2', 100));
yash2108.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
yash2108.minePendingTransactions('yash-address');

console.log('\nBalance of yash is', yash2108.getBalanceOfAddress('yash-address'));

console.log('\n Starting the miner again...');
yash2108.minePendingTransactions('yash-address');

console.log('\nBalance of yash is', yash2108.getBalanceOfAddress('yash-address'));