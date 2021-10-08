import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface SlideOverData {
  title: string;
  contents: SlideOverDataContent[]
}

export interface SlideOverDataContent {
  header: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class SlideOverService {
  private events$ = new Subject<SlideOverData>();

  get events(): Observable<SlideOverData> {
    return this.events$;
  }

  popSlideOver(data: SlideOverData) {
    this.events$.next(data);
  }

  constructor() { }
}
