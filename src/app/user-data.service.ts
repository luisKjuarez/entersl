import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';


//const serverUrl = 'http://85.25.248.90:8080/cred-digital-1.0.0/';
//const serverUrl='http://192.168.2.65:1300/';
//const serverUrl='http://192.168.2.65:1300/';
const serverUrl = 'http://85.25.248.90:8080/cred-digital-debug-1.0.0/';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {


  constructor(private http: HTTP,
    ) { }



uploadImage(user:string,token:string,image:string){
 return  this.http.uploadFile(
        serverUrl+'api/uploadimg',
        { user: user },
        { Authorization: token },
        image,
        'file'
      )
        .then(response => {

          console.log(response.status);
          return response;
        })
        .catch(response => {
          return response;
          // prints 403

        });

      }
  getUserData(name: string, token: string) {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Content-Type , Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST",
      "Authorization": token
    };

    return this.http.get(serverUrl+"api/userinfo", { "user": name }, headers).then(
      res => {

        return res;
      }, err => {

        return null;
      });

  }





}
