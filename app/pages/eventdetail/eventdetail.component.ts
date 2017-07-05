import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { MessageService } from "../../services/message.service";
import { CodesService } from "../../services/codes.service";

import { Message } from "../../models/message.class";
import { User } from "../../models/user";
import { Office } from "../../models/office";
import { Itinerary } from "../../models/itinerary";

import { Configuration } from '../../app.constants';
import { FileUpload } from 'primeng/primeng';

let jsPDF = require('jspdf');

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {

  public idMessage: string;
  public eventmessage = {};
  public author = {};
  public office = {};
  public itinerary = {};
  public offences: any;
  public actionsrequired: any;
  public actionsimplemented: any;
  public attachments: any;

  msgs: Message[];
  uploadedFiles: any[] = [];
  public baseRestUrl: string;

  constructor(  private breadServ: BreadcrumbService,
                private route:ActivatedRoute,
                private messageService: MessageService,
                private codesServices: CodesService,
                private config: Configuration  ) { }

  ngOnInit() {
        this.breadServ.clear();
        this.baseRestUrl = this.config.baserest;
        this.idMessage = this.route.snapshot.params['id'];
        this.messageService.getMessage( +this.idMessage ).subscribe( 
          returndata => { 
            this.eventmessage = returndata.message;
            this.author   = returndata.author;
            this.office   = returndata.office;
            this.itinerary= returndata.itinerary; 
            this.offences = returndata.offences;
            this.actionsrequired    = returndata.actionsrequired;
            this.actionsimplemented = returndata.actionsimplemented 
          });  
        this.messageService.getAttachments( this.idMessage ).subscribe( 
          returndata => { 
            this.attachments = returndata;
          });
  } // end ngOnInit



  updateMessage(){ 
      let data = {
            message: this.eventmessage, 
            offences: this.selectedCombobox(this.offences), 
            actionsrequired: this.selectedCombobox(this.actionsrequired),
            actionsimplemented: this.selectedCombobox(this.actionsimplemented) };
      this.messageService.updateMessage(data).subscribe(
            response => console.log('Create succesfull'),
            error => console.log(error));
  } // end of updateMessage


  // Iz combobox objekta izbere samo tiste objekte, ki imajo selected=true
  selectedCombobox(comboboxObj){ 
    return comboboxObj
            .filter(obj => obj.selected)
            .map(obj => obj)
  } // end selectedCombobox 


 onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
 } // end onUpload


  printToPDF() {
        var pagewidth = 165;
        var message: Message = new Message( this.eventmessage );
        var office = new Office( this.office );
        var author: User = new User( this.author );
        var itinerary: Itinerary = new Itinerary( this.itinerary );
        var doc = new jsPDF('p', 'mm', [297, 210]);
        doc.setFont("arial");
        doc.setFontSize(10);
        doc.text(20, 20, message.messagets );
        doc.text(20, 28, 'PRIORITY:' + message.priority );
        doc.text(20, 36, "Office/Officer: " + office.officename +" / " +author.getName() );
        doc.text(20, 44, "Itinerary: from " + itinerary.destinationfrom + " to " + itinerary.destinationto );
        doc.text(20, 52, "Bcp: " + message.bcp );
        doc.setFontSize(16);
        doc.text(20, 70, doc.splitTextToSize( message.title, pagewidth));
        doc.setFontSize(10);

        var content = message.content;

        this.selectedCombobox(this.offences);

        content = content + '\r\n\r\n';

        content = content + '\r\n\r\nOffence:';
        for (let offence of this.selectedCombobox(this.offences)){
            content = content + '\r\n' + offence.description;
        };//end for

        content = content + '\r\n\r\nAction required:';
        for (let action of this.selectedCombobox(this.actionsrequired)){
            content = content + '\r\n' + action.description;
        };//end for

        content = content + '\r\n\r\nAction implemented:';
        for (let action of this.selectedCombobox(this.actionsimplemented)){
            content = content + '\r\n' + action.description;
        };//end for        

        doc.text(20, 90, doc.splitTextToSize( content, pagewidth) );

        // Save the PDF
        doc.save('Event'+ this.idMessage +'.pdf');
    }


}
