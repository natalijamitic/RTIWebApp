import { Component, Input, OnInit } from '@angular/core';
import { INotification } from '../notification/notification.component';
import * as uuid from 'uuid'

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {

  @Input() type: string;
  @Input() notifications: Array<INotification>;

  public id = `collapse${uuid.v4()}`;

  constructor() { }

  ngOnInit(): void {
  }

}
