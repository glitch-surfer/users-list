import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDto } from '../../service/users.serice';

@Component({
  selector: 'app-user-row',
  standalone: true,
  template: `<li>
    <p>
      Name: <b>{{ user.user_name }}</b> <<>> status: {{ user.is_active }}
    </p>
  </li>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRowComponent {
  @Input({ required: true }) user!: UserDto;
}
