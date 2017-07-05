import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.css']
})
export class ImportantComponent implements OnInit {

  constructor( private breadServ: BreadcrumbService ) { }

ngOnInit() {

        // setttings the header for the home
        this.breadServ.set({
          description: ' ',
          display: true,
          header: 'Important'
        });

  }

}
