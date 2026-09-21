import { Component, inject } from '@angular/core';
import { NavItem } from './nav-item/nav-item';
import { AuthService } from '../../auth/auth.service';
import { ThemeService } from '../../theme/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-sidebar',
  imports: [NavItem, MatSlideToggleModule, MatIconModule, MatDivider],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);

  logout() {
    this.auth.logout();
  }
}
