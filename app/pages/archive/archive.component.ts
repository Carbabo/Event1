import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User} from '../../models/user';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

 constructor( 
   private breadServ: BreadcrumbService,
   private router: Router,
   private userServ: UserService )
{ 
      this.userServ.currentUser.subscribe((user: User) => { 
          if( new String( user.id ) == '-1' ){ this.router.navigate(['/login']); };
      }); 
}

  ngOnInit() {

        // setttings the header for the home
        this.breadServ.set({
          description: ' ',
          display: true,
          header: 'Archive'
        });

  }

   public ngOnDestroy() { this.breadServ.clear(); }

}
