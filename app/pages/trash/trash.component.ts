import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

 constructor( private breadServ: BreadcrumbService ) { }

 ngOnInit() {

        // setttings the header for the home
        this.breadServ.set({
          description: ' ',
          display: true,
          header: 'Trash'
        });

  }

}
