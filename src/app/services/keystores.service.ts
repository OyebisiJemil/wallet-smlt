import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class KeystoresService {
  
  
  constructor(private platform:Platform, private storage: Storage) {
    this.init();
   }

   async init() {
    const storage = await this.storage.create();
    this.storage = storage;
  }

  public async set(key: string, value: any) {
    await this.storage?.set(key, value);
  }

  public async get(key){
    return await this.storage.get(key);
  }

  public async remove(key){
    return await this.storage.remove(key);
  }

}
