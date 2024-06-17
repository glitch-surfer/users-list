import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserDto, UsersService } from '../service/users.serice';
import { map } from 'rxjs';

export const usersListResolver: ResolveFn<UserDto[]> = () => {
  return inject(UsersService)
    .getList()
    .pipe(map((res) => res.items));
};
