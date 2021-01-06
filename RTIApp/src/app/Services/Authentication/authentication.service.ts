import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import * as moment from "moment";
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedInUser = new BehaviorSubject(null);
  public isLoggedIn = this.loggedInUser.asObservable();

  public constructor(private http: HttpClient) {
  }

  public changeUser(user: any) {
    this.loggedInUser.next(user);
  }

  public login(email: string, password: string) {
    return this.http.post(`${environment.api}/login`, { email, password }).
            pipe(
                tap(res=>this.setSession(res)),
                shareReplay(),
            );
  }

  private setSession(authResult: any): void {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('expiresIn', JSON.stringify(expiresAt.valueOf));
    this.changeUser(authResult.user);
    console.log(authResult);
  }


  // EXPERIMENTING
  public tryKontakt() {
    return this.http.get(`${environment.api}/kontakt`);
  }
  proba(){
    return this.http.get(`${environment.api}/proba`);
  }
}