import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INotification } from '../add-subject-notifications/add-subject-notifications.component';
import { IEmployee } from '../employees/employees.component';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';
import { SubjectsService } from '../Services/Subjects/subjects.service';

export interface ISubjNotif {
  code: string;
  notification: INotification;
}

@Component({
  selector: 'display-subject-notifications',
  templateUrl: './display-subject-notifications.component.html',
  styleUrls: ['./display-subject-notifications.component.scss']
})
export class DisplaySubjectNotificationsComponent implements OnInit, OnDestroy {

  public user: IUser;
  public empl: IEmployee;

  public subjects: ISubjNotif[] = [];

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;

  constructor(private authService: AuthenticationService,
    private employeeService: EmployeesService,
    private subjectService: SubjectsService,
    private router: Router) { }

  ngOnInit(): void {
    this.sub1 = this.authService.isLoggedIn.subscribe((result: any) => {
      this.user = JSON.parse(result);

      if (!this.user)
        return;

      this.sub2 = this.employeeService.getEmployeeByUsername(this.user.username).subscribe((employee: IEmployee) => {
        this.empl = employee;

        if (this.empl.type != 'nastavnik') {
          this.router.navigate(['/error']);
          return;
        }

        this.sub3 = this.employeeService.getSubjectsForEmployee(this.user.username).subscribe((result: Array<string>) => {

          this.subjectService.getSubjectsByCodes(result).subscribe((result: any) => {
            result.map((subj: any) => {
              for (let n of subj.notifications) {
                let notif: INotification = {
                  title: n.title,
                  dateCreation: n.dateCreation,
                  content: n.content,
                  creator: n.creator,
                  files: n.files
                }
                this.subjects.push({
                  code: subj.code,
                  notification: notif
                });
              }
            });

            console.log(this.subjects);
          });
        })

      })
    });
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
  }

  public deleteNotification(notif: ISubjNotif, num: number): void {
    console.log(notif);
    console.log(num);
    this.subjectService.deleteNotification(notif.notification, notif.code).subscribe((result: any) => {
      this.subjects.splice(num, 1);
    })
  }

  public editNotification(notif: ISubjNotif, num: number): void {
    let navigationExtras: NavigationExtras = {
      state: {
        notif: JSON.stringify(notif)
      }
    }
    this.router.navigate([`vesti/obrada`], navigationExtras);
  }


}