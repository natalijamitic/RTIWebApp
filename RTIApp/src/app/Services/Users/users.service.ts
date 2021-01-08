import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/registration/registration.component';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) {
    }

    getAllUsers() {
        return this.http.get(`${environment.api}/users`)
            .pipe(
                map((u: any) => {
                    let users: Array<IUser> = [];
                    for (let user of u) {
                        users.push({
                            username: user.username,
                            password: user.password,
                            type: user.type,
                            firstLogin: user.firstLogin
                        });
                    }
                    return users;
                })
            );
    }

    updateUser(oldUser: IUser, newUser: IUser) {
        return this.http.post(`${environment.api}/users/update`, {oldUser, newUser});
    }

    deleteUser(user: IUser) {
        return this.http.post(`${environment.api}/users/delete`, {user});
    }
}