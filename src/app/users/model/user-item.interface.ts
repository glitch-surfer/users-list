import { EventEmitter } from '@angular/core';
import { UserDto } from '../service/users.serice';

export interface UserItem {
  user: UserDto;
  removeUser: EventEmitter<void>;
}
