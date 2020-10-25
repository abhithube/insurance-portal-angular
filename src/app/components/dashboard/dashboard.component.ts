import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  notifications: Notification[];

  constructor() {}

  ngOnInit(): void {}

  dismissNotification(id: string): void {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
  }
}
