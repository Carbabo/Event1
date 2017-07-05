import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

@Injectable()
export class OfficerService {

  public BASE_REST_URL = 'http://localhost:8080/EventTracker/rest/';

  constructor(  private http: Http 
                 ){}


  /**
   *  Login user -> check username and password
   */
  public login( credantials: any ): Observable<User> {
        return  this.http.post( this.BASE_REST_URL + "officer/login", credantials )
                .map((response: Response) => <User> response.json())
                .catch(this.handleError);
  }


  /**
   * 
   */
  public getOfficers(): Observable<any> {
        return this.http.get( this.BASE_REST_URL + 'officers?d='+(new Date().getTime()) )
                .map((response: Response) => {
                  let data = response.json();
                  return data;
                })
                .catch(this.handleError);
  }

  /**
   * 
   */
  public addOfficer( officer: any ): Observable<any> {
      return this.http.post( this.BASE_REST_URL + 'officer', officer )
              .map( (response: Response) => {
                let data = response.json()
                return data;
              })
              .catch(this.handleError);
 }

 /**
  * 
  */
  public updateOfficer( officer: any ): Observable<any> {
      return this.http.put( this.BASE_REST_URL + 'officer', officer )
              .map( (response: Response) => {
                let data = response.json()
                return data;
              })
              .catch(this.handleError);
 }

 /**
  * 
  */
 public deleteOfficer( officer: any ): Observable<any> {
        return this.http.delete( this.BASE_REST_URL + "officer/" + officer.id )
            .map((response: Response) => { 
              let data = response.json();
              return data;
            })
            .catch(error => Observable.throw(error));
  }


    /**
   *  HANDLE ERROR
   */
  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }  

}
