import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { Http, Response } from '@angular/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }



}




