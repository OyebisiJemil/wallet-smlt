import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { KeystoresService } from 'src/app/services/keystores.service';
import Web3 from 'web3';
declare let window: any;

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  isSubmitted = false;
  address:any;
  sampleTokenABI =[{"inputs":[{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
  web3: any;
  sampleToken: any;
  balance = 1000;
  enable: any;

  tokenForm = new FormGroup({
    recipientAddress: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required])
  })
  sampleTokenContractAddress = "0x4f5684EBAC3d31f99c3ffb902f2CEA80e0bD592a";
  sampleTokenContractAddressKovan = "0xdde8b29d790d4248514632fde5cc129ac638c721";

  constructor(private modalController: ModalController,private databaseService: KeystoresService) { }

  ngOnInit() {
    this.initializeWeb3();
    this.initializeContract();
    this.tokenForm = new FormGroup({
      unit: new FormControl(0, [Validators.required]),
      recipientAddress: new FormControl('', [Validators.required])
    })
  }

  async submitForm() {
     this.isSubmitted = true;
     if (!this.tokenForm.valid) {
       return false;
     } else {
      await this.makeTransaction();
     }
  }

  async initializeContract() {    
    var address =await this.databaseService.get("address");
    this.address = address;
    this.sampleToken  = new this.web3.eth.Contract(this.sampleTokenABI, this.sampleTokenContractAddress);
    let result = await this.sampleToken.methods.balanceOf(this.address).call();
  }

  close() {
    this.modalController.dismiss();
  }

  async initializeWeb3() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/1294553932ab465d9ab85bdee20b8bad"));
  }

  async makeTransaction(){
    const address =await this.databaseService.get("address");
      const keystore = await this.databaseService.get("keystore");
      var decryptedAccount = this.web3.eth.accounts.decrypt(keystore);
  
      let encodedABI = this.sampleToken.methods.transfer(this.tokenForm.value.recipientAddress, this.tokenForm.value.unit).encodeABI()
      const rawTransaction = {
        "from": address,
        "to": this.sampleTokenContractAddress,
        "gas": 100000,
        "gasPrice": 100000000000,
        "chainId": 4,
        "data": encodedABI,
      }
  
      this.web3.eth.accounts.signTransaction(rawTransaction,decryptedAccount.privateKey).then(signed =>{
        var transaction = this.web3.eth.sendSignedTransaction(signed.rawTransaction);
        transaction.on('transactionHash', hash => {
          console.log('hash');
          console.log(hash);
        });

        transaction.on('receipt', receipt => {          
          console.log(receipt);
          this.modalController.dismiss();
        });
    
        transaction.on('error', console.error);
      })
  }
}
