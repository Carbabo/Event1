import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { LoggerService } from './services/logger.service';
import { Message } from './models/message';
import { MessagesService } from './services/messages.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { AdminLTETranslateService } from './services/translate.service';
import { ViewEncapsulation } from '@angular/core';

@Component( {
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html'
    // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private title = 'app works!';
    private toastrConfig: ToasterConfig;
    private logger: LoggerService;
    private mylinks: Array<any> = [];
    
    private currentUser: User = new User();

    constructor( private userServ: UserService, private msgServ: MessagesService,
        private toastr: ToasterService, private translate: AdminLTETranslateService ) {
        this.toastrConfig = new ToasterConfig( {
            newestOnTop: true,
            showCloseButton: true,
            tapToDismiss: false
        });
        // this.translate = translate.getTranslate();
        // this.logger = new LoggerService( this.translate );
        this.userServ.currentUser.subscribe((user: User) => this.currentUser = user);        
    }

    public ngOnInit() {



        //  sedding the resize event, for AdminLTE to place the height
        let ie = this.detectIE();
        if ( !ie ) {
            window.dispatchEvent( new Event( 'resize' ) );
        } else {
            // solution for IE from @hakonamatata
            let event = document.createEvent( 'Event' );
            event.initEvent( 'resize', false, true );
            window.dispatchEvent( event );
        }

        // defining some test users
        let user = new User( {
            id: '-1',
            userid: '1',
            officeid: '1',
            officename: '',
            avatarUrl: '',
            email: '',
            firstname: '',
            lastname: '',
            localview: true,
            admin: false
        });
        
        // current user (blank)
        this.userServ.setCurrentUser( user );
        this.currentUser = user;

        // sending a test message
        this.msgServ.addMessage( new Message( {
            author: user,
            content: 'le contenu d\'un message d\'une importance extreme',
            destination: user,
            title: 'un message super important'
        }) );
              

        // define here your own links menu structure
        this.mylinks = [
          {
            'title': 'Home',
            'icon': 'home',
            'link': ['/']
          },

          {
            'title': 'New event',
            'icon': 'inbox',
            'link': ['/compose']
          },

          {
            'title': 'Events',
            'icon': 'inbox',
            'link': ['/events']
          },
          {
            'title': 'Archive',
            'icon': 'inbox',
            'link': ['/archive']
          },
          {
            'title': 'Officers',
            'icon': 'address-book-o',
            'link': ['/officers']
          }
 

        ];


    }

    protected detectIE(): any {
        let ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // IE 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // Edge (IE 12+)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
        // Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        let msie = ua.indexOf( 'MSIE ' );
        if ( msie > 0 ) {
            // IE 10 or older => return version number
            return parseInt( ua.substring( msie + 5, ua.indexOf( '.', msie ) ), 10 );
        }

        let trident = ua.indexOf( 'Trident/' );
        if ( trident > 0 ) {
            // IE 11 => return version number
            let rv = ua.indexOf( 'rv:' );
            return parseInt( ua.substring( rv + 3, ua.indexOf( '.', rv ) ), 10 );
        }

        let edge = ua.indexOf( 'Edge/' );
        if ( edge > 0 ) {
            // Edge (IE 12+) => return version number
            return parseInt( ua.substring( edge + 5, ua.indexOf( '.', edge ) ), 10 );
        }

        // other browser
        return false;
    }

}
