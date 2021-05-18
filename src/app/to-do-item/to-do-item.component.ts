import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoTask } from '../to-do-task';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent {
  @Input() task: ToDoTask | undefined;
  @Output() completedEvent = new EventEmitter<ToDoTask>();
  @Output() deletedEvent = new EventEmitter<ToDoTask>();

  constructor() {
  }

  toggleImportance(e: MouseEvent): void {
    e.preventDefault();

    if (this.task !== undefined) {
      this.task.important = !this.task.important;
    }
  }

  completeTask(): void {
    this.completedEvent.emit(this.task);
  }

  delete(e: MouseEvent): void {
    e.preventDefault();
    this.deletedEvent.emit(this.task);
  }

}
