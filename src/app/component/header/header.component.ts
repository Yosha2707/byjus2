import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$ = this.auth.userProfile$.pipe(catchError(err => throwError(err)));

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

}
