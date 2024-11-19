import { Component } from '@angular/core';
import { UsersService } from './services/user/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-cheatsheet-app';
  users: any[] = [];
  private subscription: Subscription | undefined;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.subscription = this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
