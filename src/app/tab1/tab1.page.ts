import { Component } from '@angular/core';
import Web3  from 'web3';
import { ModalController} from '@ionic/angular';
import { AddressPage } from '../pages/address/address.page';
import { SendPage } from '../pages/send/send.page';
import { KeystoresService } from '../services/keystores.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = 'smlt-wallet';
  sampleTokenABI = [{"inputs":[{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
  web3: any;
  sampleToken: any;
  balance = 1000;
  transactions:[];
  address:any;

  loading: any = true;
  sampleTokenContractAddressRinkeby = "0x4f5684EBAC3d31f99c3ffb902f2CEA80e0bD592a";
  sampleTokenContractAddressKovan = "0xdde8b29d790d4248514632fde5cc129ac638c721";

  constructor(public modalController:ModalController,private databaseService: KeystoresService) { }

  async ngOnInit(){
    this.initializeWeb3();
    this.initializeContract();
  }

  async initializeContract() {    
    this.address = await this.databaseService.get("address");
    this.sampleToken  = new this.web3.eth.Contract(this.sampleTokenABI, this.sampleTokenContractAddressRinkeby);
    let result = await this.sampleToken.methods.balanceOf(this.address).call();
    this.balance = result;
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
    this.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/1294553932ab465d9ab85bdee20b8bad"));
  }
}
