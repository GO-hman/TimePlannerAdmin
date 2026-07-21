import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { UserCreate } from './pages/users/user-create/user-create';

export const routes: Routes = [
  {
    path: 'users',
    component: Users,
  },
  {
    path: 'users/user-create',
    component: UserCreate,
  }
];
