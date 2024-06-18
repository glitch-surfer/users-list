import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-mode-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: ` <label>
    View:
    <select [formControl]="control">
      <option value="none" disabled>view options</option>
      <option value="list">List</option>
      <option value="cards">Cards</option>
    </select>
  </label>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewModeSelectComponent {
  @Input({ required: true }) control!: FormControl;
}
