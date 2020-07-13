
import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';

 const serverUrl = 'http://85.25.248.90:8080/cred-digital-debug-1.0.0/';
//const serverUrl='http://192.168.2.65:1300/';
//const serverUrl='http://192.168.2.65:1300/';
const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public user: Observable<any>;
  device_id: any;

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



  async presentAlert(message: string, header: string, subh: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subh,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }




  login(credentials: { user: string, pw: string ,imei:string}) {
    let postData = {
      "username": credentials.user,
      "password": credentials.pw,
      "imei":credentials.imei
    }

    this.http.setDataSerializer("json");
     return this.http.post(serverUrl + 'auth/authenticate', postData, this.headers)
      .then(
        res => {
          this.tokenStr = JSON.parse(res.data).token;
          let decoded = helper.decodeToken(JSON.parse(res.data).token);


          this.userData.next(decoded);
          let storageObs = from(this.storage.set(TOKEN_KEY, JSON.parse(res.data).token));

          this.router.navigateByUrl('/home');
          return storageObs;
        },
        err => {
        //  this.presentAlert(JSON.stringify(err),"","");
           if (err.status == -1 || err.status == -4)
            this.presentAlert("Verifique que tenga conexión a internet.", "Error", "No se pudo conectar al servidor.");
          else
            this.presentAlert(JSON.parse(err.error).message, "Error", "");
          return null;
        });
  }


  register(credentials: { user: string, pw: string, curp: string ,imei:string}) {
    let postData = {
      "username": credentials.user,
      "password": credentials.pw,
      "curp": credentials.curp,
      "imei":credentials.imei
    }

    this.http.setDataSerializer("json");

    return this.http.post(serverUrl + 'auth/register', postData, this.headers)
      .then(
        res => {
          this.presentAlert("Usuario registrado, ahora puede iniciar sesion.", "Registrado", "");
          this.router.navigateByUrl('/login');
          return res;
        },
        err => {
          if (err.status == -1)
            this.presentAlert("Verifique que tenga conexión a internet.", "Error", "No se pudo conectar al servidor.");
          else
            this.presentAlert(JSON.parse(err.error).message, "Error:: ", "");
          return err;
        });
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
