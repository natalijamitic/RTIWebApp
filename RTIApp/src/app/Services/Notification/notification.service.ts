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

  updateNotificationType(oldType: string, newType: string){
    return this.http.post(`${environment.api}/notificationtypes/update`, {oldType, newType});
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