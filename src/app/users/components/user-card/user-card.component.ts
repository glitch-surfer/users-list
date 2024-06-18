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
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  template: `
    <li class="card">
      <p>
        Name: <b>{{ user.user_name }}</b>
      </p>
      <p>Status: {{ user.is_active }}</p>
      <button (click)="removeUser.emit()">Remove</button>
    </li>
  `,
  styles: `
  .card {
    display: inline-block;
    padding: 0.5rem;
    border: 1px solid black;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent implements UserItem {
  @Input({ required: true }) user!: UserDto;
  @Output() removeUser = new EventEmitter<void>();
}
