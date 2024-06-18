import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { DELAY } from '../const/numbers';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private DB: UserDto[] = [
    { id: 'u1', user_name: 'Ivan Z.', is_active: true },
    { id: 'u2', user_name: 'Mikhail X.', is_active: true },
    { id: 'u3', user_name: 'Ivan C.', is_active: true },
    { id: 'u4', user_name: 'Petr V.', is_active: true },
    { id: 'u5', user_name: 'Artyom B.', is_active: true },
    { id: 'u6', user_name: 'Gleb N.', is_active: true },
    { id: 'u7', user_name: 'Anton M.', is_active: true },
    { id: 'u8', user_name: 'Semyon A.', is_active: true },
    { id: 'u9', user_name: 'Arseniy S.', is_active: true },
    { id: 'u10', user_name: 'Nick D.', is_active: true },
    { id: 'u11', user_name: 'Alex F.', is_active: true },
    { id: 'u12', user_name: 'Kirill G.', is_active: true },
    { id: 'u13', user_name: 'Stas H.', is_active: true },
    { id: 'u14', user_name: 'Yuriy J.', is_active: true },
    { id: 'u15', user_name: 'Roman K.', is_active: true },
    { id: 'u16', user_name: 'Ivan L.', is_active: true },
    { id: 'u17', user_name: 'Ivan Q.', is_active: true },
  ];

  getList(request: ListRequest): Observable<UserListResponseDto> {
    return of(this.getItems(request)).pipe(delay(DELAY));
  }

  // TODO: remove since it's not used
  getById(id: string): Observable<UserDto | null> {
    return of(this.DB.find((user) => user.id === id) ?? null).pipe(
      delay(DELAY)
    );
  }

  remove(id: string): Observable<null> {
    this.DB = this.DB.filter((user) => user.id !== id);

    return of(null).pipe(delay(DELAY));
  }

  private getItems({
    search,
    itemsPerPage,
    pageNumber,
  }: ListRequest): UserListResponseDto {
    const items = search
      ? this.DB.filter((user) => user.user_name.toLowerCase().includes(search))
      : this.DB;
    const total_count = items.length;

    return {
      items: items.slice(
        (pageNumber - 1) * itemsPerPage,
        pageNumber * itemsPerPage
      ),
      total_count,
    };
  }
}

export interface UserDto {
  id: string;
  user_name: string;
  is_active: boolean;
}

export interface ListRequest {
  pageNumber: number;
  search?: string;
  itemsPerPage: 5 | 10 | 20;
}

export interface UserListResponseDto {
  total_count: number;
  items: UserDto[];
}
