import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressPageRoutingModule } from './address-routing.module';
//import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { AddressPage } from './address.page';

@NgModule({
  imports: [
    CommonModule,
    //NgxQRCodeModule,
    FormsModule,
    IonicModule,
    AddressPageRoutingModule
  ],
  declarations: [AddressPage],
  ///schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddressPageModule {}
