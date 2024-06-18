import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserListResponseDto, UsersService } from '../service/users.serice';

export const usersListResolver: ResolveFn<UserListResponseDto> = () => {
  return inject(UsersService).getList({ pageNumber: 1, itemsPerPage: 5 });
};
