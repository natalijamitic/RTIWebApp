import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import * as moment from "moment";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string) {
    return this.http.post(`${environment.api}/login`, { email, password }).
            pipe(
                tap(res=>this.setSession(res)),
                shareReplay(),
            );
  }

  proba(){
    return this.http.get(`${environment.api}/proba`);
  }

  private setSession(authResult: any): void {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('expiresIn', JSON.stringify(expiresAt.valueOf));
  }

  public tryKontakt() {
    return this.http.get(`${environment.api}/kontakt`);
  }
}