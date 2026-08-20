import { Component, inject, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    Sidebar,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  drawer = viewChild.required<MatSidenav>('drawer');

  isMobile = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        if (this.isMobile()) {
          this.drawer().close();
        }
      });
  }
}
