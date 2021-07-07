import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoTask } from '../to-do-task';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  @Input() task: ToDoTask | undefined;
  @Output() selectedEvent = new EventEmitter<ToDoTask>();
  @Output() completedEvent = new EventEmitter<number>();
  @Output() uncompletedEvent = new EventEmitter<number>();
  @Output() deletedEvent = new EventEmitter<number>();

  select(): void {
    this.selectedEvent.emit(this.task);
  }

  toggleImportance(e: MouseEvent): void {
    e.preventDefault();

    if (this.task !== undefined) {
      this.task.important = !this.task.important;
    }
  }

  completeTask(): void {
    this.completedEvent.emit(this.task.id);
  }

  deCompleteTask(): void {
    this.uncompletedEvent.emit(this.task.id);
  }

  delete(e: MouseEvent): void {
    e.preventDefault();
    this.deletedEvent.emit(this.task.id);
  }

}
