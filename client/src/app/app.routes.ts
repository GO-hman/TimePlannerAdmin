import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { UserCreate } from './pages/users/user-create/user-create';
import { AuthGuard } from './auth/auth.guard';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'users',
    component: Users,
  },
  {
    path: 'users/user-create',
    component: UserCreate,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
  },
];
