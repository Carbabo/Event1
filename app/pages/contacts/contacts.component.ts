import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { OfficerService } from "../../services/officer.service";
import { UserService } from '../../services/user.service';
import { User} from '../../models/user';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

 private officer: User = new User();
 private officers = [];
 public modalMode: string = "123";

 constructor(   
   private breadServ: BreadcrumbService,
   private officerService: OfficerService,
   private router: Router,
   private userServ: UserService ) 
  {
      this.userServ.currentUser.subscribe((user: User) => { 
          if( new String( user.id ) == '-1' ){ this.router.navigate(['/login']); };
      });  
  }

 ngOnInit() {
        this.breadServ.clear();
        this.officerService.getOfficers().subscribe( 
              returndata => { 
                this.officers = returndata;
              })
        
  }


  newOfficer(){ this.modalMode="new";
                this.officer = new User(); }


  addOfficer(){ this.officerService.addOfficer( this.officer )
                          .subscribe(
                              response => { 
                                this.officers.push( response ); 
                            },error => console.log(error));
                 } // end of addOficer

  editOfficer( editofficer){
                  document.getElementById('OpenModal').click();
                  this.modalMode="edit";
                  this.officer = editofficer;
              }

  updateOfficer(officer){
                  this.officerService.updateOfficer( new User( this.officer ) )
                  .subscribe(),error => console.log(error)
            }            

  deleteOfficer(officer){ this.officerService.deleteOfficer( this.officer )
                  .subscribe(
                    response => {
                        var index = this.officers.indexOf(this.officer);
                        this.officers.splice(index, 1); 
                    },error => console.log(error)
                  );
              }            

}
