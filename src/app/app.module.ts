import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import {RatingModule} from "ng2-rating";
import {PostresumeService} from './postresume.service';
import { HttpModule } from '@angular/http';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  ApiService
} from './api.service';
import {
  AuthService
} from './auth/auth.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { PostResumeComponent } from './post-resume/post-resume.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {SigninComponent} from './signin/signin.component';
import {SigninService} from './signin.service';
import{GlobalServices} from './GlobalService.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {JobListService} from './job-list.service';
import { SearchComponent } from './search/search.component';
import {LoaderService} from './loader.service';
 import {ToastaModule} from 'ngx-toasta';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { RestrictTodayDirective } from './restrict-today.directive';
import { SampleComponent } from './sample/sample.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// import {
//   HomeComponent
// } from './pages/home/home.component';
import {
  CallbackComponent
} from './pages/callback.component';
import {
  ProfileComponent
} from './pages/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    ProfileComponent,

    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    PostResumeComponent,
    AboutComponent,
    ContactComponent,SigninComponent, SearchComponent, RestrictTodayDirective,
    SampleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    AppRoutingModule,ReactiveFormsModule,RatingModule,HttpModule,NgxPaginationModule,ToastaModule.forRoot(),
    BrowserAnimationsModule,BsDatepickerModule.forRoot()
  ],
  providers: [
    ApiService,
    AuthService,
    PostresumeService,SigninService,GlobalServices,JobListService,LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}