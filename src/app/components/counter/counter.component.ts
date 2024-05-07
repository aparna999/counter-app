import { Component } from '@angular/core';
import { Subscription, interval, switchMap } from 'rxjs';
import { DeadlineService } from '../../services/deadline.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  secondsLeft: number = 0;
  private subscription: Subscription | undefined;

  constructor(private deadlineService: DeadlineService) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  private startCountdown(): void {
    this.subscription = this.deadlineService
      .getDeadline()
      .pipe(
        switchMap((response) => {
          this.secondsLeft = response.secondsLeft;
          return interval(1000);
        })
      )
      .subscribe(() => {
        if (this.secondsLeft > 0) {
          this.secondsLeft--;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
