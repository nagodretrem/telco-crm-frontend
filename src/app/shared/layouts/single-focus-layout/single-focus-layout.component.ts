import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'etiya-single-focus-layout',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './single-focus-layout.component.html',
  styleUrl: './single-focus-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleFocusLayoutComponent {
  @Input() headerTemplate?: TemplateRef<any>;
 }
