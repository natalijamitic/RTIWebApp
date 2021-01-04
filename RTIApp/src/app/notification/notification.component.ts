import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../Services/Notification/notification.service';

export interface INotification {
  dateCreation: Date;
  title: string;
  content: string;
  type: string;
}

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public notificationTypes: Array<string>;
  public notifications: Array<Array<INotification>>;

  constructor(private notifService: NotificationService) { }

  ngOnInit(): void {
    this.initializeNotifications();
  }

  public initializeNotifications(): void {
    this.notifService.getAllNotificationTypes().subscribe((result: Array<string>) => {

        if (result && result.length > 0) {
          this.notificationTypes = result;
          this.notifications = new Array<Array<INotification>>(result.length)

          this.notifService.getAllNotifications().subscribe((result: Array<INotification>) => {

              if (result && result.length > 0) {
                for (let notification of result) {
                  let typeIndex = this.notificationTypes.findIndex(type => type === notification.type);
                  if (!this.notifications[typeIndex]) {
                    this.notifications[typeIndex] = [notification];
                  }
                  else {
                    this.notifications[typeIndex].push(notification);
                  }
                }
              }
            },
            (error: HttpErrorResponse) => {
              console.log(error);
            }
          )

        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

  }
}
