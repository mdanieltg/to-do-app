import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskItem } from '../task-item';
import { DEFAULT_TASK } from '../utils/task-utils';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  @Input() task: TaskItem = DEFAULT_TASK;
  @Output() selectedEvent = new EventEmitter<number>();
  @Output() updatedEvent = new EventEmitter<TaskItem>();
  @Output() deletedEvent = new EventEmitter<number>();

  toggleCompletion(): void {
    if (this.task !== undefined) {
      this.task.completed = !this.task.completed;
      this.task.completionDate = this.task.completed
                                 ? new Date()
                                 : undefined;

      this.updateTask();
    }
  }

  toggleImportance(e: MouseEvent): void {
    e.preventDefault();

    if (this.task !== undefined) {
      this.task.important = !this.task.important;
      this.task.completionDate = new Date();
      this.updateTask();
    }
  }

  select(): void {
    this.selectedEvent.emit(this.task.id);
  }

  delete(e: MouseEvent): void {
    e.preventDefault();
    this.deletedEvent.emit(this.task.id);
  }

  private updateTask(): void {
    this.updatedEvent.emit(this.task);
  }
}
