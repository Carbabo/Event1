import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuard } from './services/guard.service';

// Components
import { HomeComponent }    from './pages/home/home.component';
import { ClientComponent }  from './pages/client/client.component';

import { SendmailComponent }  from './pages/sendmail/sendmail.component';
import { ImportantComponent } from './pages/important/important.component';
import { DraftsComponent }    from './pages/drafts/drafts.component';
import { TrashComponent }     from './pages/trash/trash.component';
import { ContactsComponent }  from './pages/contacts/contacts.component';
import { ComposeComponent }   from './pages/compose/compose.component';

import { LoginComponent }   from './pages/login/login.component';
import { EventsComponent }   from './pages/events/events.component';
import { EventdetailComponent }   from './pages/eventdetail/eventdetail.component';
import { ArchiveComponent }   from './pages/archive/archive.component';

const routes: Routes = [
  // Root
  {
    component: HomeComponent,
    path: ''
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    canActivate: [CanActivateGuard],
    component: ClientComponent,
    path: 'client'
  },
  {
    canActivate: [CanActivateGuard],
    component: EventsComponent,
    path: 'events'
  },
  {
    canActivate: [CanActivateGuard],
    component: EventdetailComponent,
    path: 'eventdetail/:id'
  },
  {
    canActivate: [CanActivateGuard],
    component: SendmailComponent,
    path: 'sendmail'
  },
  {
    canActivate: [CanActivateGuard],
    component: ImportantComponent,
    path: 'important'
  },
  {
    canActivate: [CanActivateGuard],
    component: DraftsComponent,
    path: 'drafts'
  },
  {
    canActivate: [CanActivateGuard],
    component: ArchiveComponent,
    path: 'archive'
  },
  {
    canActivate: [CanActivateGuard],
    component: ContactsComponent,
    path: 'officers'
  },
  {
    canActivate: [CanActivateGuard],
    component: ComposeComponent,
    path: 'compose'
  }    

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
