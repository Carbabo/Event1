import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User} from '../../models/user';

/** Services */
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { MessageService } from "../../services/message.service";
import { UserService} from '../../services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']

}) export class EventsComponent implements OnInit {

  private currentUser: User = new User();
  messages: any;
  private tablecaption: String;

  constructor( 
    private breadServ: BreadcrumbService,
    private messageService: MessageService,
    private userServ: UserService,
    private router: Router    
  ){
        this.userServ.currentUser.subscribe((user: User) => { 
            this.currentUser = user;
            if( new String( this.currentUser.id ) == '-1' ){ this.router.navigate(['/login']); };
        });  
  }

  ngOnInit() {
                this.breadServ.clear();
                if( this.currentUser.localview ){
                    this.tablecaption = "Events - local view"; 
                    this.messageService.getOfficeMessages( this.currentUser.officeid ).subscribe( returndata => { this.messages = returndata } );}
                else{
                    this.tablecaption = "Events - global view"; 
                    this.messageService.getAllMessages().subscribe( returndata => { this.messages = returndata } ); }
          } // end ngOnInit


discardMessage( message ){ this.messageService
                  .deleteMessage( message )
                  .subscribe(response => { 
                      var index = this.messages.indexOf(message);
                      this.messages.splice(index, 1); 
                    },error => console.log(error));
                } // end of createMessage

} // end of component
