import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { UserCreate } from './pages/users/user-create/user-create';
import { AuthGuard } from './auth/auth.guard';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './components/login/login';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'users',
        component: Users,
      },
      {
        path: 'users/user-create',
        component: UserCreate,
      },
    ],
  },
];
