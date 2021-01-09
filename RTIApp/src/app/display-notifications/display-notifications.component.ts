import { Component, OnInit } from '@angular/core';
import { INotification } from '../notification/notification.component';
import { NotificationService } from '../Services/Notification/notification.service';

@Component({
  selector: 'display-notifications',
  templateUrl: './display-notifications.component.html',
  styleUrls: ['./display-notifications.component.scss']
})
export class DisplayNotificationsComponent implements OnInit {

  public notificationTypes: Array<string> = null;
  public notifications: Array<INotification> = null;

  public notification: INotification = {
    title: null,
    dateCreation: null,
    content: null,
    type: null
  }

  constructor(private notifService: NotificationService) { }

  ngOnInit(): void {
    this.notifService.getAllNotificationTypes().subscribe((result: Array<string>) => {
      this.notificationTypes = result;
    });

    this.notifService.getAllNotificationsNoFilter().subscribe((result: Array<INotification>) => {
      this.notifications = result;
    });
  }

  public deleteNotification(notif: INotification, num: number): void {
    this.notifService.deleteNotification(notif.dateCreation).subscribe((result: any) => {
      this.notifications.splice(num, 1);
    })
  }

  public insertType(): void {
    if (!this.notification.title || !this.notification.type || !this.notification.content) {
      return;
    }
    this.notifService.insertNotification(this.notification).subscribe((result: any) => {
      if (!this.notification.dateCreation) {
        this.notification.dateCreation = new Date();
      }
      this.notifications.push(this.notification);
      this.notification = {
        title: null,
        dateCreation: null,
        content: null,
        type: null
      }
    });
  }
}
