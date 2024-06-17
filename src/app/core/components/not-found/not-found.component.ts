import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `<h2>not-found :(</h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
