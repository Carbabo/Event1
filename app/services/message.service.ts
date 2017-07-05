import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Configuration } from '../app.constants';
import { Message } from "../models/message.class";


@Injectable()
export class MessageService {

  private BASE_REST_URL:string;

  constructor(  private http: Http,
                private config: Configuration ) {

                this.BASE_REST_URL = config.baserest;
                }


  /**
   *  getMessage
   */
  public getMessage(id: number): Observable<any> {
         return this.http
                    .get( this.BASE_REST_URL +'message/'+id+'?d='+ (new Date().getTime()) )
                    .map( (response: Response) => {
                      let data = response.json();
                       return data;
                    })
                    .catch( this.handleError );
  }  

  /**
   *  getAllMessages
   */
  public getAllMessages(): Observable<any> {
    return this.http.get( this.BASE_REST_URL +'messages?d='+ (new Date().getTime()) )
        .map((response: Response) => {
          let data = response.json();
          return data;
        })
        .catch(this.handleError);
  }  

  /**
   *  getOfficeMessages
   */
  public getOfficeMessages(officeId: number): Observable<any> {
    return this.http.get( this.BASE_REST_URL + "messages/" + officeId + '?d='+(new Date().getTime()) )
        .map((response: Response) => {
          let data = response.json();
          return data;
        })
        .catch(this.handleError);
  }

  /**
   *  addOfficeMessage
   */
  public addOfficeMessage(message: Message): Observable<Message> {
        return this.http.post( this.BASE_REST_URL + "messages/", message )
            .map((response: Response) => <Message> response.json())
            .catch(error => Observable.throw(error));
  }

  public deleteMessage(message: Message): Observable<Message> {
        return this.http.delete( this.BASE_REST_URL + "messages/" + message.id )
            .map((response: Response) => { 
              let data = response.json();
              return data;
            })
            .catch(error => Observable.throw(error));
  }

  public updateMessage(message: any): Observable<any> {
        return this.http.put( this.BASE_REST_URL + "messages", message )
            .map((response: Response) =>{
              let data = response.json();
              return data; 
            })
            .catch(error => Observable.throw(error));
  }

  /**
   *  All offences and selected for message
   */
  public getOffencesCodes( messageid: String ): Observable<any> {
    return this.http.get( this.BASE_REST_URL +'messasge/'+messageid+'/offences?d='+ (new Date().getTime()) )
        .map((response: Response) => {
          let data = response.json();
          return data;
        })
        .catch(this.handleError);
  } 


  /**
   * 
   */
  public getAttachments( messageid: String ): Observable<any> {
    return this.http.get( this.BASE_REST_URL +'message/'+messageid+'/attachments?d='+ (new Date().getTime()) )
        .map((response: Response) => response.json() )
        .catch(this.handleError);
  } 


  public getCountMessagesByOffice(): Observable<any> {
    return this.http.get( this.BASE_REST_URL +'message/officecount?d='+ (new Date().getTime()) )
        .map((response: Response) => response.json() )
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
