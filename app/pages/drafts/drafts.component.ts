import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent implements OnInit {

  constructor( private breadServ: BreadcrumbService ) { }

 ngOnInit() {

        // setttings the header for the home
        this.breadServ.set({
          description: ' ',
          display: true,
          header: 'Drafts'
        });

  }

}
