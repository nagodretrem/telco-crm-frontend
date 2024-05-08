import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent implements OnInit {
  countdown: number = 10;

  constructor(
    private router: Router,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const countdown$: Observable<number> = of(this.countdown).pipe(delay(this.countdown * 1000));

    countdown$.subscribe(() => {
      this.router.navigate(['/login']);
    });

    const intervalId = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(intervalId);
      }
      this.change.markForCheck();
    }, 1000);
  }
}
