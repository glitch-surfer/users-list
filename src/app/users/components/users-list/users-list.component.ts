import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserDto } from '../../service/users.serice';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  private readonly users$$ = new BehaviorSubject<UserDto[]>(
    inject(ActivatedRoute).snapshot.data['users']
  );
  readonly users$ = this.users$$.asObservable();
}