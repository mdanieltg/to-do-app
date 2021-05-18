import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoTask } from '../to-do-task';

@Component({
  selector: 'app-completed-item',
  templateUrl: './completed-item.component.html',
  styleUrls: ['./completed-item.component.css']
})
export class CompletedItemComponent {
  @Input() task: ToDoTask | undefined;
  @Output() unfinishedEvent = new EventEmitter<ToDoTask>();
  @Output() deletedEvent = new EventEmitter<ToDoTask>();

  constructor() {
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
