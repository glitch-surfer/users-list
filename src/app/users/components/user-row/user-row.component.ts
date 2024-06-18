import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UserDto } from '../../service/users.serice';
import { UserItem } from '../../model/user-item.interface';

@Component({
  selector: 'app-user-row',
  standalone: true,
  template: `<li>
    <p>
      Name: <b>{{ user.user_name }}</b> <<>> status: {{ user.is_active }}
    </p>
    <button (click)="removeUser.emit()">Remove</button>
  </li>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRowComponent implements UserItem {
  @Input({ required: true }) user!: UserDto;
  @Output() removeUser = new EventEmitter<void>();
}
