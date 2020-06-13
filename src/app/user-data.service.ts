import { Injectable } from '@angular/core';
import {Observable,of,throwError} from 'rxjs';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {catchError, tap , map} from 'rxjs/operators';



const url='http://192.168.100.220:1300/api/userinfo';
const httpOptions={
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    console.log(error);
    return throwError('Algo salio mal');
  }


private getData(res: Response)
{

  let body = res;
  return body;
}

  getUserData(): Observable<any>{

    return this.http.get(url,httpOptions).pipe(
      map(this.getData),catchError(this.handleError));

  }





}
