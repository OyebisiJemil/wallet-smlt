import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KeystoresService } from '../../services/keystores.service';
import Web3 from 'web3';
declare let window: any;

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {
  web3: any;
  password: any
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  accountForm = new FormGroup({
    password: new FormControl('', Validators.required)
  });

  constructor(private databaseService: KeystoresService) {
    this.web3 = new Web3();
  }

 async createAccount() {
    if (this.accountForm.invalid) {
      return;
    }
    var account = this.web3.eth.accounts.create();

    var keystore = this.web3.eth.accounts.encrypt(account.privateKey, this.accountForm.value.password);
    await this.databaseService.set("address", account.address);
    await this.databaseService.set("keystore", JSON.stringify(keystore));
  }




  // var result1 = this.web3.eth.accounts.create();
  // console.log(result1);
  // console.log("Address 1 = "+result1.address);
  // console.log("privateKey 1 = "+result1.privateKey);
  // var result2 = this.web3.eth.accounts.encrypt(result1.privateKey, this.accountForm.value.password);
  // console.log("address 2 = "+result2.address);
  // console.log("encrypted = "+result2.crypto.ciphertext);

  // var decrypted = this.web3.eth.accounts.decrypt(result2, this.accountForm.value.password);
  // console.log(decrypted);
}
