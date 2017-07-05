import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component( {
    selector: 'app-header',
    styleUrls: ['./app-header.component.css'],
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

    constructor(
      private userServ: UserService,
      private router: Router
    ) {}

  public ngOnInit() { 
         window.dispatchEvent( new Event( 'resize' ) ); 
  }    

  private logoff(){
     let user = new User({});
     this.userServ.setCurrentUser(user);
     this.router.navigate(['/login']); // login page 
  }  

}// end of class 
