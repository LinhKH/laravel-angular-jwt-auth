import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

// User interface
export class User {
    name: String;
    email: String;
    password: String;
    password_confirmation: String
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }

    // User registration
    register(user: User): Observable<any> {
        return this.http.post(`${this.baseUrl}register`, user);
    }

    // Login
    signin(user: User): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}login`, user);
    }

    // Access user profile
    profileUser(): Observable<any> {
        return this.http.get(`${this.baseUrl}user-profile`);
    }

    sendResetPasswordLink(data) {
        return this.http.post(`${this.baseUrl}reset-password-request`, data)
    }

    resetPassword(data) {
        return this.http.post(`${this.baseUrl}change-password`, data)
    }

}

