import { Routes } from '@angular/router';
import { UsersListComponent } from './users/components/users-list/users-list.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
