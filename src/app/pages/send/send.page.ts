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
  sampleTokenABI = [{"inputs":[{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"standard","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
  web3: any;
  sampleToken: any;
  balance = 1000;


  tokenForm = new FormGroup({
    recipientAddress: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required])
  })
  sampleTokenContractAddress = "0xdde8b29d790d4248514632fde5cc129ac638c721";

  constructor(private modalController: ModalController,private databaseService: KeystoresService) { this.web3 = new Web3(); }

  ngOnInit() {
    this.initializeWeb3();
    this.initializeContract();
    this.tokenForm = new FormGroup({
      unit: new FormControl(0, [Validators.required]),
      recipientAddress: new FormControl('', [Validators.required])
    })
  }

  async submitForm() {
     // Use BigNumber
     let decimals = this.web3.utils.toBN(18);
     let amount = this.web3.utils.toBN(100);
     this.isSubmitted = true;
     if (!this.tokenForm.valid) {
       return false;
     } else {
       console.log(this.tokenForm.value)
       // calculate ERC20 token amount
       let value = this.tokenForm.value.unit;
       let add = this.address; //this.tokenForm.value.recipientAddress;
       console.log(value);
       console.log(this.tokenForm.value.recipientAddress)
       let dd = await this.sampleToken.methods.transfer(add, value).send({ from: "0xdde8b29d790d4248514632fde5cc129ac638c721"});
       console.log(dd);
     }
  }

  async initializeContract() {    
    var a =await this.databaseService.get("address");
    console.log(a);
    this.address = "0xC8d424150A227B7bf9eA4988CF850062404e9BA0";
    this.sampleToken  = new this.web3.eth.Contract(this.sampleTokenABI, this.sampleTokenContractAddress);
    let result = await this.sampleToken.methods.balanceOf(this.address).call();
    this.balance = this.web3.utils.fromWei(result, "ether");
    this.balance = Math.round(this.balance * 100) / 100
  }

  close() {
    this.modalController.dismiss();
  }

  async initializeWeb3() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.ethereum;
      } else {
        this.web3 = new Web3.providers.WebsocketProvider("ws://localhost:8545");
      }
      
      this.web3 = new Web3(window.ethereum);
      //this.enable = this.enableMetaMaskAccount();
    }
  }
}
