import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Configuration } from '../../app.constants';
import { FileUpload } from 'primeng/primeng';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Message } from "../../models/message.class";
import { MessageService } from '../../services/message.service';
import { ItineraryService } from '../../services/itinerary.service';
import { CodesService } from '../../services/codes.service';

declare var $:JQueryStatic;


@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

        private currentUser: User = new User();
        private event_message: Message = new Message({});
        private offences: any;
        private actionsrequired: any;
        private actionsimplemented: any;
        private itinerarys: any;
        private attachments: any;
        public baseRestUrl: string;
        hideModal: boolean = false;

        constructor( 
          private config: Configuration,
          private router: Router,
          private breadServ: BreadcrumbService,
          private messageService: MessageService,
          private itineraryService: ItineraryService,
          private codeService: CodesService,
          private userServ: UserService
        ){
              this.userServ.currentUser.subscribe((user: User) => { 
                  this.currentUser = user;
                  if( new String( this.currentUser.id ) == '-1' ){ this.router.navigate(['/login']); };
              });  
        } // end of constructor

        ngOnInit(){
                    // base REST url for upload
                    this.baseRestUrl = this.config.baserest; 
                    // breadcrumb 
                    this.breadServ.set({  // setttings the header for the home
                        description: ' ',
                        display: true,
                        header: 'Create New Event' });
                    // user    
                    this.userServ.currentUser.subscribe((user: User) => this.currentUser = user); 
                    // message author & office   
                    this.event_message.author = this.currentUser.userid;  
                    this.event_message.office = this.currentUser.officeid;  
                    // codes for itinerarys
                    this.itineraryService.getAllItinerarys().subscribe( returndata => { this.itinerarys = returndata } );
                    // codes for offences and actions
                    this.codeService.getDomainCodes('offence').subscribe( returndata => { this.offences = returndata } );
                    this.codeService.getDomainCodes('action').subscribe(  returndata => { this.actionsrequired = returndata } );
                    this.codeService.getDomainCodes('action').subscribe(  returndata => { this.actionsimplemented = returndata } );
                    //create empty(draft) message
                    this.createMessage();
        } // end of ngOnInit 

      
      public ngOnDestroy() { this.breadServ.clear(); }


        /**
         *  CREATE
         */
        createMessage(){  this.messageService
                          .addOfficeMessage(this.event_message)
                          .subscribe(
                            response => { this.event_message = new Message(response); 
                            },error => console.log(error));
                       } // end of createMessage
        /**
         *   UPDATE
         */
        updateMessage(){ 
                          let data = {
                                message: this.event_message, 
                                offences: this.selectedFromCombobox(this.offences), 
                                actionsrequired: this.selectedFromCombobox(this.actionsrequired),
                                actionsimplemented: this.selectedFromCombobox(this.actionsimplemented), };
                          this.messageService.updateMessage(data).subscribe(
                                response => this.router.navigateByUrl('events'),
                                error => console.log(error));
                      } // end of updateMessage

        discardMessage(){ this.messageService
                          .deleteMessage(this.event_message)
                          .subscribe(
                            response => { this.router.navigateByUrl('events'); 
                            },error => console.log(error));
                       } // end of createMessage


      /**
       *  SELECTED FROM COMBOBOX
       *  Iz combobox objekta izbere samo tiste objekte, ki imajo selected=true
       */
      selectedFromCombobox(comboboxObj){ 
                        return comboboxObj
                               .filter(obj => obj.selected)
                               .map(obj => obj)
                     } // end selectedCombobox 


      /**
       *  ON UPLOAD (when file upload is complete, refresh list of attachments)
       */
      onUpload(event) { this.messageService.getAttachments( ""+this.event_message.id ).subscribe( 
                        returndata => { 
                              this.attachments = returndata; 
                              document.getElementById('CloseModal').click();
                         });
                    } // end onUpload

      

}
