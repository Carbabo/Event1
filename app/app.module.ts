// external module

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { environment } from '../environments/environment';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileUploadModule } from 'primeng/primeng';

//import {AccordionModule} from 'primeng/primeng';
//import {CalendarModule} from 'primeng/primeng';
import {GMapModule} from 'primeng/primeng';
import {ChartModule}  from 'primeng/primeng';
import {DialogModule}  from 'primeng/primeng';


export function createTranslateLoader( http: Http ) {
    return new TranslateStaticLoader( http, '../public/assets/i18n', '.json' );
}

let modules = [
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AngularFireModule.initializeApp( environment.firebase ),
    TranslateModule.forRoot({
        deps: [Http],
        provide: TranslateLoader,
        useFactory: (createTranslateLoader)
    }),
    ToasterModule,
    Ng2SmartTableModule,
    FileUploadModule,
    GMapModule,
    ChartModule,
    DialogModule
    ];

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './widgets/app-header';
import { AppFooterComponent } from './widgets/app-footer';
import { MenuAsideComponent } from './widgets/menu-aside';
import { ControlSidebarComponent } from './widgets/control-sidebar';
import { MessagesBoxComponent } from './widgets/messages-box';
import { NotificationBoxComponent } from './widgets/notification-box';
import { TasksBoxComponent } from './widgets/tasks-box';
import { UserBoxComponent } from './widgets/user-box';
import { BreadcrumbComponent } from './widgets/breadcrumb';

let widgets = [
    AppComponent,
    BreadcrumbComponent,
    AppHeaderComponent,
    AppFooterComponent,
    MenuAsideComponent,
    ControlSidebarComponent,
    MessagesBoxComponent,
    NotificationBoxComponent,
    TasksBoxComponent,
    UserBoxComponent
];

import { Configuration } from './app.constants';
import { UserService } from './services/user.service';
import { MessagesService } from './services/messages.service';
import { MessageService } from './services/message.service';
import { OfficerService } from './services/officer.service';
import { ItineraryService } from './services/itinerary.service';
import { CodesService } from './services/codes.service';
import { CanActivateGuard } from './services/guard.service';
import { NotificationService } from './services/notification.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { AdminLTETranslateService } from './services/translate.service';
import { LoggerService } from './services/logger.service';

let services = [
    UserService,
    BreadcrumbService,
    MessagesService,
    MessageService,
    OfficerService,
    ItineraryService,
    CodesService,
    CanActivateGuard,
    NotificationService,
    AdminLTETranslateService,
    LoggerService
];

import { HomeComponent } from './pages/home/home.component';
import { ClientComponent } from './pages/client/client.component';

let pages = [
    HomeComponent,
    ClientComponent,
];

// main bootstrap
import { routing } from './app.routes';
import { SendmailComponent } from './pages/sendmail/sendmail.component';
import { ImportantComponent } from './pages/important/important.component';
import { DraftsComponent } from './pages/drafts/drafts.component';
import { TrashComponent } from './pages/trash/trash.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ComposeComponent } from './pages/compose/compose.component';
import { EventsComponent } from './pages/events/events.component';
import { EventdetailComponent } from './pages/eventdetail/eventdetail.component';
import { LoginComponent } from './pages/login/login.component';
import { ArchiveComponent } from './pages/archive/archive.component';



@NgModule( {
    bootstrap: [AppComponent],
    declarations: [
        ...widgets,
        ...pages,
        SendmailComponent,
        ImportantComponent,
        DraftsComponent,
        TrashComponent,
        ContactsComponent,
        ComposeComponent,
        EventsComponent,
        EventdetailComponent,
        LoginComponent,
        ArchiveComponent
    ],
    imports: [
        ...modules,
        routing
    ],
    providers: [
        ...services,
        Configuration
    ]
})
export class AppModule { }
