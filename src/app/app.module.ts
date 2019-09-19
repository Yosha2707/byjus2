import {
  NgModule
} from '@angular/core';

import {HttpModule} from '@angular/http';

import {
  AppRoutingModule
} from './app-routing.module';

import {
  AuthService
} from './auth/auth.service';
import {
  AppComponent
} from './app.component';
import {
  HeaderComponent
} from './component/header/header.component';

import {
  NgxPaginationModule
} from 'ngx-pagination';

import {JobListService} from './services/job-list.service';

import {
  HomeComponent
} from './component/home/home.component';


import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  CallbackComponent
} from './component/callback/callback.component';



@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [
    AuthService,
    JobListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}