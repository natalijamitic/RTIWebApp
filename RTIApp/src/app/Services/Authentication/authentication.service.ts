import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import * as moment from "moment";
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { IStudent, IUser } from 'src/app/registration/registration.component';
import { IEmployee } from 'src/app/employees/employees.component';


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

  public logout(): void {
    localStorage.removeItem('idToken');
    this.changeUser(null);
  }



  public registerStudent(user: IUser, student: IStudent) {
    return this.http.post(`${environment.api}/register/student`, {user, student});
  }

  public registerEmployee(user: IUser, employee: IEmployee) {
    return this.http.post(`${environment.api}/register/employee`, {user, employee});
  }

  public firstLoginPassChange(username: string, oldPass: string, newPass: string) {
    return this.http.post(`${environment.api}/login/first`, {username, oldPass, newPass});
  }


  public postImage(formData: FormData){
    return this.http.post(`${environment.api}/register/uploadFile`, formData);
  }

  private setSession(authResult: any): void {
    localStorage.setItem('idToken', authResult.idToken);
    this.changeUser(authResult.user);
  }

  // EXPERIMENTING
  public tryKontakt() {
    return this.http.get(`${environment.api}/kontakt`);
  }
  proba(){
    return this.http.get(`${environment.api}/proba`);
  }
}