import { Routes } from '@angular/router';
import { UsersListComponent } from './users/components/users-list/users-list.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { usersListResolver } from './users/resolvers/users-list.resolver';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
    resolve: {
      users: usersListResolver,
    },
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
