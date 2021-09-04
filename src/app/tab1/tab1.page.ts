import { Component } from '@angular/core';
import Web3  from 'web3';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ModalController} from '@ionic/angular';
import { AddressPage } from '../pages/address/address.page';
import { SendPage } from '../pages/send/send.page';
import { KeystoresService } from '../services/keystores.service';
declare let window: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = 'smlt-wallet';
  sampleTokenABI = [{"inputs":[{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"standard","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
  web3: any;
  sampleToken: any;
  balance = 1000;
  transactions:[];
  address:any;

  loading: any = true;
  sampleTokenContractAddress = "0xdde8b29d790d4248514632fde5cc129ac638c721";

  constructor(public modalController:ModalController,private databaseService: KeystoresService) {
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    }
    this.web3 = new Web3();
  }

  async ngOnInit(){
    this.initializeWeb3();
    this.initializeContract();
  }

  async initializeContract() {    
    this.address = "0xC8d424150A227B7bf9eA4988CF850062404e9BA0";
    this.sampleToken  = new this.web3.eth.Contract(this.sampleTokenABI, this.sampleTokenContractAddress);
    let result = await this.sampleToken.methods.balanceOf(this.address).call();
    this.balance = this.web3.utils.fromWei(result, "ether");
    this.balance = Math.round(this.balance * 100) / 100
  }

  async showAddressModal(){
    try{
      const modal = await this.modalController.create({
        component:AddressPage
      })
    return  await modal.present();
    }
    catch{}      
  }

  async showSendModal(){
    try{
      const modal = await this.modalController.create({
        component:SendPage
      })
    return  await modal.present();
    }
    catch{}      
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
    }
  }
}
