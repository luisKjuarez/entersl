import { Injectable } from '@angular/core';
import {Observable,of,throwError} from 'rxjs';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {catchError, tap , map} from 'rxjs/operators';

const serverUrl='http://85.25.248.90:8080/cred-digital-1.0.0/';
const httpOptions={
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class IconsDataService {

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

  getIconsData(): Observable<any>{

    return this.http.get(serverUrl+"api/icons",httpOptions).pipe(
      map(this.getData),catchError(this.handleError));

  }


}
