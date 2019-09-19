import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {
  environment
} from '../../environments/environment';

@Injectable()
export class JobListService {
  constructor(private http: Http) {}
  getList(): Observable < Response > {
    let url = 'https://nut-case.s3.amazonaws.com/jobs.json';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    }).catch(this.handleerror);
  }

  handleerror(error: Response) {
    return Observable.throw(error);
  }

}