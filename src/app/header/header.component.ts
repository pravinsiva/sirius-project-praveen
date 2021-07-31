import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  date = new Date('August 08, 2021 18:00:00');
  counter$: Observable<number>;
  subscription: Subscription;
  timer: string
  constructor() { }

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe((x) => {
      x = Math.floor((this.date.getTime() - new Date().getTime()) / 1000);
      this.timer = this.dhms(x)
    });

  }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      days + 'd',
      hours + 'h',
      minutes + 'm',
      seconds + 's'
    ].join(' ');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
