import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './auth/secure.interceptor';

import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './pages/callback.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CommonModule } from '@angular/common';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {PostResumeComponent} from './post-resume/post-resume.component';
import {ServicesComponent}  from './services/services.component';
import {SigninComponent} from './signin/signin.component';
import {SearchComponent} from './search/search.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [
          AuthGuard
        ]
      },
      { path:'home',component:HomeComponent},
      { path:'postresume',component:PostResumeComponent},
      { path:'service',component:ServicesComponent},
      { path:'about',component:AboutComponent},
      { path:'contact',component:ContactComponent},
      {path:'signin',component:SigninComponent},
      {path:'search',component:SearchComponent},
      { path:'',component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
