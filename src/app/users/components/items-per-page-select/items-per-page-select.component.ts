import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-per-page-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <label>
      Items per page:
      <select [formControl]="control">
        <option value="none" disabled>items per page</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsPerPageSelectComponent {
  @Input({ required: true }) control!: FormControl;
}
