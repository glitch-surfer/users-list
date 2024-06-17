import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { UserDto, UsersService } from '../../service/users.serice';
import {
  BehaviorSubject,
  Subject,
  debounceTime,
  fromEvent,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { UserRowComponent } from '../user-row/user-row.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserCardComponent } from '../user-card/user-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class UsersListComponent implements OnInit {
  @ViewChild('searchInput', { static: true, read: ElementRef })
  searchInput!: ElementRef<HTMLInputElement>;

  private readonly usersService = inject(UsersService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly users$$ = new BehaviorSubject<UserDto[]>(
    inject(ActivatedRoute).snapshot.data['users']
  );
  readonly users$ = this.users$$.asObservable();

  private readonly isLoading$$ = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoading$$.asObservable();

  readonly searchString$$ = new Subject<string>();

  readonly selectViewOption = new FormControl('none');

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        tap(() => this.isLoading$$.next(true)),
        map((event) =>
          (event.target as HTMLInputElement).value.trim().toLowerCase()
        ),
        switchMap((name) => this.usersService.searchByName(name)),
        tap((users) => this.users$$.next(users)),
        tap(() => this.isLoading$$.next(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
