import { Component } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { CreateAccountPage } from './pages/create-account/create-account.page';
import { KeystoresService } from './services/keystores.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private modalController: ModalController, private keystoresService: KeystoresService) {
    this.initializeApp();
  }

  async ngOnInit(){
    this.keystoresService.init();
  }
  async initializeApp() {
    this.platform.ready().then(async () => {
     let value = await this.keystoresService.get("address");
     if(value === null){
      await this.showCreateAccountModal()
     }else{
     }
      
    });
  }


  async showCreateAccountModal() {
    try {
      let modal = this.modalController.create({
        component: CreateAccountPage
      });
      return (await modal).present()
    }
    catch { }
  }



}
