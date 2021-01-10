import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ISubjectShort } from '../master/master.component';
import * as uuid from 'uuid'
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { Subscription } from 'rxjs';
import { IUser } from '../registration/registration.component';

@Component({
  selector: 'master-card',
  templateUrl: './master-card.component.html',
  styleUrls: ['./master-card.component.scss']
})
export class MasterCardComponent implements OnInit, OnDestroy {

  @Input() semestar: number;
  @Input() subjects: Array<ISubjectShort>;

  public id = `collapse${uuid.v4()}`;

  public loggedInUser: IUser = null;

  private sub1: Subscription;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.sub1 = this.authService.isLoggedIn.subscribe((user: any) => {
      this.loggedInUser = JSON.parse(user);
    });
  }

  ngOnDestroy(): void {
    if(this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  public showSubjectLink(subj: ISubjectShort): boolean {
    return this.loggedInUser?.type == 'student';
  }

}
