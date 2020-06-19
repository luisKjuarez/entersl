import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StoreUserService {
 KEY_USR="user_key";

 userData;
  constructor(private storage : Storage,
              private alertCtrl:AlertController,private plt:Platform) {
                this.storage.ready().then((readySource) => {
                  readySource.ready(()=>{

                    this.getStoreduser();
                  })

        // Platform now ready, execute any required native code
      });
               }


    storeUser(user:any){
      this.storage.set(this.KEY_USR, JSON.stringify(user)).then(res=>{
      return true;

    },err=>{
      return false;
    });
 }

getUserData():Promise<any>{
  return this.getStoreduser().then(res=>{
    return res;
  })
 }


   getStoreduser(){
      return this.storage.get(this.KEY_USR).then(res=>{
       this.userData=res;
       return res;
    },err=>{
      return null;
    });
   }

logout(){
  this.storage.remove(this.KEY_USR).then(() => {
    this.userData=null;
  });
}

   async presentAlert(message: string) {
     const alert = await this.alertCtrl.create({
       cssClass: 'my-custom-class',
       header: 'Alert',
       subHeader: 'Subtitle',
       message: message,
       buttons: ['OK']
     });

     await alert.present();
   }
}
