import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mb-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  isShown = false;

  @Input() id: string;
  @Output() onClosed = new EventEmitter<void>();  

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    if (!this.id) {
      throw new Error("Modal must have id assigned!");
    }

    this.modalService.registerModal(this);
  }

  ngOnDestroy(): void {
    this.modalService.unregisterModal(this.id);
  }

  open() {
    this.isShown = true;
  }

  close() {
    this.isShown = false;
    this.onClosed.emit();
  }
}
