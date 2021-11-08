import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mb-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent implements OnInit {
  @Input() iconClassName: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
