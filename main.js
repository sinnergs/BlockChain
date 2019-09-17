const SHA256=require("crypto-js/sha256")
class Block{
    constructor(index,data,timeStamp,previousHash=''){
        this.index=index;
        this.data=data;
        this.timeStamp=timeStamp;
        this.previousHash=previousHash;
        this.hash=this.constructHash();
        this.nonce=0;
    }
    constructHash(){
         return SHA256(this.index+JSON.stringify(this.data)+this.timeStamp+this.previousHash+this.nonce).toString();
    }
    blockMined(difficulty){
        while(this.hash.substring(0,difficulty)!==Array(difficulty+1).join("0")){
            ++this.nonce;
            this.hash=this.constructHash();
        }
        console.log("block mined of hash:"+this.hash);        
    }
}
class BlockChain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=6;        
    }
    createGenesisBlock(){
        return new Block(0,"Genesis Block","9/17/19","0");
    }
    getlatestBlock(){
        return this.chain[this.chain.length -1];
    }
    addNewBlock(newBlock){
        newBlock.previousHash=this.getlatestBlock().hash;
        newBlock.blockMined(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];
            if( currentBlock.hash!==currentBlock.constructHash()){
                return false
            }
            if(currentBlock.previousHash!==previousBlock.hash){
                return false
            }
        }
        return true
    }
}
let meraPaise=new BlockChain();
console.log("mining block 1...");
meraPaise.addNewBlock(new Block(1,{amount:100},'9/19/2019'));
console.log("mining block 2...");
meraPaise.addNewBlock(new Block(2,{amount:200},'9/21/2019'));
console.log("mining block 3...");
meraPaise.addNewBlock(new Block(3,{amount:300},'9/23/2019'));

