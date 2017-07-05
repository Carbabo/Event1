import { Component, Directive, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbService } from '../../services/breadcrumb.service';
import { GMapModule} from 'primeng/primeng';
import { ChartModule} from 'primeng/primeng';
import { UIChart } from "primeng/components/chart/chart";

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core'; 
import { GoogleMap, Marker, Circle } from 'angular2-google-maps/core/services/google-maps-types';

import { MessageService } from "../../services/message.service";


declare const google;
declare const MarkerClusterer;

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
}) export class HomeComponent implements OnInit, OnDestroy {
 
          @ViewChild("chart") chart: UIChart; 

          data: any;
          options: any;
          countmessages: any;
          names: string[];
          counts: any;
          private currentUser: User = new User();

          mapOptions: any;
          overlays: any[];

  
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
                    
                    
                    /**
                     * GRAF
                     */
                    this.options = { scales: { 
                                            yAxes: [
                                              { ticks: {
                                                  beginAtZero:true,
                                                  min: 0 }
                                              }]
                                            }};


                                      this.data = {
                                          labels: [],
                                          datasets: [
                                              {
                                                  label: 'Action required',
                                                  backgroundColor: '#42A5F5',
                                                  borderColor: '#1E88E5',
                                                  data: []
                                              },
                                              {
                                                  label: 'Action implemented',
                                                  backgroundColor: '#9CCC65',
                                                  borderColor: '#7CB342',
                                                  data: []
                                              }
                                          ]
                                      }


                          this.messageService.getCountMessagesByOffice().subscribe( returndata => { 
                                

                                
                                this.countmessages = returndata.data;
                                this.names = returndata.names;
                                this.counts = returndata.counts;

                                this.data.labels = returndata.names;
                                //this.data.datasets[0].data=[10,20,30,40];

                                this.data.datasets[0].data=returndata.counts;
                                this.data.datasets[1].data=returndata.counts;
                                
                                this.chart.refresh();
                

                                
                                });

                
           }// end of constructor






  public ngOnInit() { // setttings the header for the home
                        this.breadServ.set({
                          description: ' important informations ',
                          display: true,
                          header: 'Dashboard',
                          levels: [
                            {
                              icon: 'dashboard',
                              link: ['/'],
                              title: 'Home'
                            }
                          ]
                        });

                      this.overlays = [
                        new google.maps.Marker({position: {lat: 35.879466, lng: 8.267648}, title:"Location 01"}),
                        new google.maps.Circle({center: {lat: 35.879466, lng: 8.267648}, fillColor: '#EF897C', fillOpacity: 0.35, strokeWeight: 1, radius: 15000}),

                        new google.maps.Marker({position: {lat: 34.879466, lng: 8.267648}, title:"Location 02"}),
                        new google.maps.Circle({center: {lat: 34.879466, lng: 8.267648}, fillColor: '#EF897C', fillOpacity: 0.35, strokeWeight: 1, radius: 30000}),

                        new google.maps.Marker({position: {lat: 33.879466, lng: 7.527648}, title:"Location 03"}),
                        new google.maps.Circle({center: {lat: 33.879466, lng: 7.527648}, fillColor: '#EF897C', fillOpacity: 0.35, strokeWeight: 1, radius: 50000}),       

                        new google.maps.Marker({position: {lat: 31.879466, lng: 9.127648}, title:"Location 04"}),
                        new google.maps.Circle({center: {lat: 31.879466, lng: 9.127648}, fillColor: '#EF897C', fillOpacity: 0.35, strokeWeight: 1, radius: 15000}),                   

                      ];

                      this.mapOptions = 
                      { center: {lat: 34, lng: 10}, zoom: 7 };

                  } // end of ngOnInit



  public ngOnDestroy() {
                    // removing the header
                    this.breadServ.clear(); }

} // end of component
