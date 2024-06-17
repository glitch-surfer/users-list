import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserDto } from '../../service/users.serice';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { UserRowComponent } from '../user-row/user-row.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    UserRowComponent,
    ReactiveFormsModule,
    UserCardComponent,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  private readonly users$$ = new BehaviorSubject<UserDto[]>(
    inject(ActivatedRoute).snapshot.data['users']
  );
  readonly users$ = this.users$$.asObservable();

  readonly selectViewOption = new FormControl('none');
}
