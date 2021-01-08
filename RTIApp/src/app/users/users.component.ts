import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../registration/registration.component';
import { UsersService } from '../Services/Users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public users: Array<IUser> = null;

  private subscription: Subscription;
  private subscriptionDelete: Subscription;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.usersService.getAllUsers().subscribe((result: Array<IUser>) => {
      this.users = result;
      this.users.sort((a, b) => {
        if (a.type == 'admin' || (a.type == 'zaposlen' && b.type == 'student'))
          return -1;
        return 1;
      });
      console.log(result);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.subscriptionDelete) {
      this.subscriptionDelete.unsubscribe();
    }
  }

  public deleteUser(user: IUser): void {
    this.subscriptionDelete = this.usersService.deleteUser(user).subscribe((result: any) => {
      this.users = this.users.filter((u: IUser) => u.username != user.username);
    })
  }

  public editUser(user: IUser): void {
    let navigationExtras: NavigationExtras = {
      state: {
        employee: JSON.stringify(user)
      }
    }
    this.router.navigate([`korisnici/obrada/${user.type}`], navigationExtras);
  }
}
