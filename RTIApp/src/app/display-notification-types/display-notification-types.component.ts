import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../Services/Notification/notification.service';

@Component({
  selector: 'display-notification-types',
  templateUrl: './display-notification-types.component.html',
  styleUrls: ['./display-notification-types.component.scss']
})
export class DisplayNotificationTypesComponent implements OnInit, OnDestroy {

  public typesOld: Array<string> = null;
  public types: Array<string> = null;
  public newType: string;

  public show: Array<boolean> = [false];

  private subscription: Subscription;

  constructor(private notifService: NotificationService) { }

  ngOnInit(): void {
    this.subscription = this.notifService.getAllNotificationTypes().subscribe((result: Array<string>) => {
      this.typesOld = result;
      this.types = [...this.typesOld];
      for (let type in this.types) {
        this.show[type] = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public updateType(type: string, num: number): void {
    let elem = document.getElementsByClassName("type-" + num)[0];
    if (!this.show[num]) {
      this.show[num] = true;
      (elem as HTMLInputElement).disabled = false;
    } else {
      if (this.typesOld[num] != type) {

        this.notifService.updateNotificationType(this.typesOld[num], type).subscribe((result)=>{
          this.typesOld[num] = type;
        })

      }
      (elem as HTMLInputElement).disabled = true;
      this.show[num] = false;
    }
  }

  public deleteType(type: string, num: number): void {
    this.notifService.deleteNotificationType(type).subscribe((result: any) => {
      this.typesOld.splice(num, 1);
      this.types.splice(num, 1);
      this.show.splice(num, 1);
    })
  }

  public insertType(): void {
    if (this.newType) {
      this.notifService.insertNotificationType(this.newType).subscribe((result: any) => {
        this.typesOld.push(this.newType);
        this.types.push(this.newType);
        this.newType = null;
        this.show.push(false);
      })
    }
  }

  trackByFn(index: any, item: any) {
    return index;
 }
}
