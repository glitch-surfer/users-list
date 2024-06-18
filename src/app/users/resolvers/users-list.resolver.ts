import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserListResponseDto, UsersService } from '../service/users.serice';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../const/numbers';

export const usersListResolver: ResolveFn<UserListResponseDto> = () => {
  return inject(UsersService).getList({
    pageNumber: DEFAULT_PAGE_NUMBER,
    itemsPerPage: DEFAULT_PAGE_SIZE,
  });
};
