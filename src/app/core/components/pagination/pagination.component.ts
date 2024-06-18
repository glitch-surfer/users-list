import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { ItemsPerPage } from '../../../users/model/items-per-page.interface';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from '../../../users/const/numbers';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input({ required: true }) itemsPerPage: ItemsPerPage = DEFAULT_PAGE_SIZE;
  @Input({ required: true }) totalItems = 0;
  @Input({ required: true }) currentPage = DEFAULT_PAGE_NUMBER;
  @Input() isDisabled = false;

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}
