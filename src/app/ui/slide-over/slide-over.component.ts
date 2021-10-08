import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SlideOverData, SlideOverService } from '../slide-over.service';

@Component({
  selector: 'mb-slide-over',
  templateUrl: './slide-over.component.html',
  styleUrls: ['./slide-over.component.scss']
})
export class SlideOverComponent implements OnInit {
  shown$ = new BehaviorSubject<boolean>(false);
  data$: Observable<SlideOverData>;

  constructor(private slideOverService: SlideOverService) { }

  ngOnInit(): void {
    this.data$ = this.slideOverService.events
    .pipe(
      tap(x => this.shown$.next(true))
    );
  }

  close() {
    this.shown$.next(false);
  }
}
