import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDto } from '../../service/users.serice';

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
export class UserCardComponent {
  @Input({ required: true }) user!: UserDto;
}
