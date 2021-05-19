import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoTask } from '../to-do-task';

@Component({
  selector: 'app-done-item',
  templateUrl: './done-item.component.html',
  styleUrls: ['./done-item.component.css']
})
export class DoneItemComponent {
  @Input() task: ToDoTask | undefined;
  @Output() selectedEvent = new EventEmitter<ToDoTask>();
  @Output() unfinishedEvent = new EventEmitter<ToDoTask>();
  @Output() deletedEvent = new EventEmitter<ToDoTask>();

  constructor() {
  }

  select(): void {
    this.selectedEvent.emit(this.task);
  }

  toggleImportance(e: MouseEvent): void {
    e.preventDefault();

    if (this.task !== undefined) {
      this.task.important = !this.task.important;
    }
  }

  undoTask(): void {
    this.unfinishedEvent.emit(this.task);
  }

  delete(e: MouseEvent): void {
    e.preventDefault();
    this.deletedEvent.emit(this.task);
  }

}
