import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CallbackComponent } from './component/callback/callback.component';
import {HomeComponent} from './component/home/home.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'callback', component: CallbackComponent},
      {path:'',component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
