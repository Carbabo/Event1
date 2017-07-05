import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { OfficerService } from '../../services/officer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  
  public password: string;
  public username: string;
  public showwarning: boolean = false;
  public returndata: any;

  constructor(
                private userServ: UserService,
                private officerService: OfficerService,
                private router: Router
  ){}


  public ngOnInit() { 
         window.dispatchEvent( new Event( 'resize' ) ); 
  }


  
  private login(){
          let credentials = { "username":this.username, "password":this.password }; 
          this.officerService.login(credentials).subscribe( returndata => { 
                    let user = new User(returndata);
                    if(user.connected==true){
                        user.avatarUrl='public/assets/img/user-icon-gray.png';
                        this.userServ.setCurrentUser(user); 
                        this.showwarning = false;
                        this.router.navigate(['/']); // home page
                    }else{
                        this.showwarning = true;
                    }
                    this.returndata = returndata;
                    });                
 } // end login



}