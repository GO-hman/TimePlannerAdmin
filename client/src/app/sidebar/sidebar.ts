import { Component, inject } from '@angular/core';
import { NavItem } from './nav-item/nav-item';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [NavItem],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
