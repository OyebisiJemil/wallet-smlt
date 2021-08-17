import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  address: any;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.loadAddres();
  }

  close() {
    this.modalController.dismiss();
  }

  loadAddres() {
    this.address = "0xC8d424150A227B7bf9eA4988CF850062404e9BA0";
  }
}
