import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'mb-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(public alertService: AlertService) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.alertService.dismiss();
  }
}
