
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';


const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public user: Observable<any>;
  tokenStr: string;
  private userData = new BehaviorSubject(null);
  headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, Content-Type , Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST",
  };

  constructor(private storage: Storage,
    private http: HTTP,
    private plt: Platform,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private router: Router) {
    this.user = null;

    this.loadStoredToken();


  }

  loadStoredToken() {
    let platformObs = from(this.plt.ready());

    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if (token) {
          this.tokenStr = token;
          let decoded = helper.decodeToken(token);
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );


  }


  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 1500
    });
    toast.present();
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




  login(credentials: { user: string, pw: string }) {
    let postData = {
      "username": credentials.user,
      "password": credentials.pw
    }

    this.http.setDataSerializer("json");

    return this.http.post('http://192.168.100.220:1300/auth/authenticate', postData, this.headers)
      .then(
        res => {
          this.tokenStr = JSON.parse(res.data).token;
          let decoded = helper.decodeToken(JSON.parse(res.data).token);


          this.userData.next(decoded);
          let storageObs = from(this.storage.set(TOKEN_KEY, JSON.parse(res.data).token));
          return storageObs;
          //  return JSON.parse(res.data).token;
        },
        err => {
          return null;
        });
    /*
           return this.http.post('http://192.168.100.220:1300/authenticate',{username:credentials.user,password:credentials.pw}
    ,{headers:new HttpHeaders({"Content-Type":"application/json" })}
         ).pipe(
          take(1),
          map(res => {
            this.presentToast(JSON.stringify(res));
        return `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcnVlYmEiLCJ1c2VyLW5hbWUiOiJwcnVlYmEiLCJleHAiOjE1OTI4NTc0ODMsImlhdCI6MTU5MjI1MjY4M30.kNgMHjsR5WKpPHyzrFMdVLQz5I3aUTyX9-w3ZllRCzjoa6WDpWqkrEsY7xmXIKtfFXXp-RvET97hn2PdHmaztQ`;
          }),
          switchMap(token => {
            let decoded = helper.decodeToken(token);
            this.userData.next(decoded);
            this.presentToast('rsrrf');

            let storageObs = from(this.storage.set(TOKEN_KEY, token));
            return storageObs;
          })
        );*/
  }

  getUser() {
    return this.userData.getValue();
  }

  getToken() {
    return this.tokenStr;
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('login');
      this.userData.next(null);
    });
  }


}
