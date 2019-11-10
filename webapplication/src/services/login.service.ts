import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private logedSource = new BehaviorSubject(false)
    currentLogedSource = this.logedSource.asObservable();

    constructor(private http: HttpClient) { }

    validateLogin(user: User) {
        return this.http.post(`${environment.apiBaseUrl}/login`, user).toPromise();
    }

    changeLoginStatus(isLoged: boolean){
        this.logedSource.next(isLoged);
    }
}
