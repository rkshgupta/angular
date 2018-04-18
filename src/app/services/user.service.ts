import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user.model';

@Injectable()
export class UserService {

	private serviceUrl = "./assets/users.json";

  constructor(private http: HttpClient) {
        this.getUser().subscribe(data => {
            console.log(data)
        });
    }

    public getUser(): Observable<any> {
        return this.http.get(this.serviceUrl)
    }

}
 