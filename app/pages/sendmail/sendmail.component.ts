import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.css']
})
export class SendmailComponent implements OnInit {

  constructor( private breadServ: BreadcrumbService ) { }

 ngOnInit() {

        // setttings the header for the home
        this.breadServ.set({
          description: ' ',
          display: true,
          header: 'Send Mail'
        });

  }

}
