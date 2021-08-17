import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendPageRoutingModule } from './send-routing.module';

import { SendPage } from './send.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,    
    SendPageRoutingModule
  ],
  declarations: [SendPage]
})
export class SendPageModule {}
