import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { INotification } from 'src/app/notification/notification.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {

  }

  getAllNotifications() {
    return this.http.get(`${environment.api}/notifications`)
      .pipe(
        map((n: any) => {
          let notifications: Array<INotification> = [];
          for (let notification of n) {
            notifications.push({
              title: notification.title,
              content: notification.content,
              dateCreation: notification.dateCreation,
              type: notification.type.typeName
            });
          }
          return notifications;
        })
      );
  }

  getAllNotificationsNoFilter() {
    return this.http.get(`${environment.api}/notifications/all`)
    .pipe(
      map((n: any) => {
        let notifications: Array<INotification> = [];
        for (let notification of n) {
          notifications.push({
            title: notification.title,
            content: notification.content,
            dateCreation: notification.dateCreation,
            type: notification.type.typeName
          });
        }
        return notifications;
      })
    );
  }

  insertNotification(notif: INotification) {
    return this.http.post(`${environment.api}/notification/insert`, {notif});
  }

  deleteNotification(date: any) {
    return this.http.post(`${environment.api}/notification/delete`, {date});
  }

  updateNotificationType(oldType: string, newType: string){
    return this.http.post(`${environment.api}/notificationtypes/update`, {oldType, newType});
  }

  insertNotificationType(newType: string){
    return this.http.post(`${environment.api}/notificationtypes/insert`, {newType});
  }

  deleteNotificationType(type: string) {
    return this.http.post(`${environment.api}/notificationtypes/delete`, {type});
  }

  getAllNotificationTypes() {
    return this.http.get(`${environment.api}/notificationtypes`)
      .pipe(
        map((n: any) => {
          let types: Array<String> = [];
          for (let t of n) {
            types.push(t.typeName);
          }
          return types;
        })

      );
  }

}