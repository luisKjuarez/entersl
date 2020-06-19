import { Injectable } from '@angular/core';
import {Observable,of,throwError} from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import {catchError, tap , map} from 'rxjs/operators';
import { AlertController } from '@ionic/angular';



const url='http://192.168.100.220:1300/api/userinfo';


@Injectable({
  providedIn: 'root'
})

export class UserDataService {


  constructor(    private http: HTTP,
    private alertCtrl:AlertController) { }



  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'sesion expirada',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
private getData(res: Response)
{

  let body = res;
  this.presentAlert(JSON.stringify(body));
  return body;
}

  getUserData(name:string,token:string){
let    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Content-Type , Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST"  ,
    "Authorization":token   };
     return this.http.get(url,{"user":name},headers).then(
      res=>{
          return res;
      },err=>{

       return null;
      });

  }





}
