import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CodesService {

  public BASE_REST_URL = 'http://localhost:8080/EventTracker/rest/';

  constructor(  private http: Http 
                 ){}

  /**
   *  Codes by domain
   */
  public getDomainCodes( domain: String ): Observable<any> {
    return this.http.get( this.BASE_REST_URL +'codes/'+domain+'?d='+ (new Date().getTime()) )
        .map((response: Response) => {
          let data = response.json();
          return data;
        })
        .catch(this.handleError);
  } 


  /**
   *  HANDLE ERROR
   */
  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }  

}
