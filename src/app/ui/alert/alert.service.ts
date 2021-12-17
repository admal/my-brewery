import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum AlertType {
  Success,
  Warning,
  Error,
  Info
}

export interface AlertData {
  type: AlertType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _currentAlertData$ = new BehaviorSubject<AlertData>(null);

  get currentAlertData$(): Observable<AlertData> {
    return this._currentAlertData$;
  }

  get currentAlertData(): AlertData {
    return this._currentAlertData$.value;
  }

  success(message) {
    this._show(AlertType.Success, message);
  }

  error(message) {
    this._show(AlertType.Error, message);
  }

  info(message) {
    this._show(AlertType.Info, message);
  }

  warning(message) {
    this._show(AlertType.Warning, message);
  }

  dismiss() {
    this._currentAlertData$.next(null);
  }

  private _show(type: AlertType, message: string) {
    this._currentAlertData$.next({
      type: type,
      message: message
    });
  }

  constructor() { }
}
