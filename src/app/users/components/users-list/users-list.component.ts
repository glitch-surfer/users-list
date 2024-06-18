import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  ListRequest,
  UserDto,
  UserListResponseDto,
  UsersService,
} from '../../service/users.serice';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  finalize,
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
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';
import { ViewMode } from '../../model/view-mode.interface';
import { ItemsPerPage } from '../../model/items-per-page.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    UserRowComponent,
    ReactiveFormsModule,
    UserCardComponent,
    PaginationComponent,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  @ViewChild('searchInput', { static: true, read: ElementRef })
  searchInput!: ElementRef<HTMLInputElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly usersService = inject(UsersService);

  private readonly usersData: UserListResponseDto =
    inject(ActivatedRoute).snapshot.data['users'];

  private readonly users$$ = new BehaviorSubject<UserDto[]>(
    this.usersData.items
  );
  readonly users$ = this.users$$.asObservable();

  get search(): string {
    return this.searchInput.nativeElement.value.trim().toLowerCase();
  }

  private readonly isLoading$$ = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoading$$.asObservable();

  readonly selectViewOption = new FormControl<ViewMode>('none');
  viewMode: ViewMode = 'list';

  readonly selectItemsPerPage = new FormControl<ItemsPerPage>(5);

  itemsPerPage: ItemsPerPage = 5;
  currentPage = 1;
  totalItems = this.usersData.total_count;

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        tap(() => this.isLoading$$.next(true)),
        map((event) =>
          (event.target as HTMLInputElement).value.trim().toLowerCase()
        ),
        switchMap((search) =>
          this.usersService.getList({
            search,
            itemsPerPage: this.itemsPerPage,
            pageNumber: 1,
          })
        ),
        tap(({ items, total_count }) => {
          this.users$$.next(items);
          this.totalItems = total_count;
        }),
        tap(() => (this.currentPage = 1)),
        tap(() => this.isLoading$$.next(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.selectViewOption.valueChanges
      .pipe(
        tap((viewMode) => viewMode && (this.viewMode = viewMode)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.selectItemsPerPage.valueChanges
      .pipe(
        tap(
          (itemsPerPage) => itemsPerPage && (this.itemsPerPage = itemsPerPage)
        ),
        tap(() => (this.currentPage = 1)),
        tap(() => this.onPageChange(this.currentPage)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onPageChange(pageNumber: number): void {
    this.isLoading$$.next(true);

    this.getUsers({
      itemsPerPage: this.itemsPerPage,
      search: this.search,
      pageNumber,
    }).subscribe();
  }

  onRemoveUser(id: string): void {
    const shouldMoveToPrevPage = this.users$$.value.length === 1;

    this.isLoading$$.next(true);

    this.usersService
      .remove(id)
      .pipe(
        switchMap(() =>
          this.getUsers({
            pageNumber: shouldMoveToPrevPage
              ? this.currentPage - 1 || 1
              : this.currentPage,
            itemsPerPage: this.itemsPerPage,
            search: this.search,
          })
        ),
        finalize(() => this.isLoading$$.next(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private getUsers(bodyReq: ListRequest): Observable<UserListResponseDto> {
    return this.usersService.getList(bodyReq).pipe(
      tap(({ items, total_count }) => {
        this.users$$.next(items);
        this.totalItems = total_count;
      }),
      tap(() => (this.currentPage = bodyReq.pageNumber)),
      finalize(() => this.isLoading$$.next(false)),
      takeUntilDestroyed(this.destroyRef)
    );
  }
}
