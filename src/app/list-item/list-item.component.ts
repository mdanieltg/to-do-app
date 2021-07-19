import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskItem } from '../task-item';
import { DEFAULT_TASK, isPastDue } from '../utils/task-utils';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  pastDueDate = false;
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

  ngOnInit(): void {
    this.pastDueDate = isPastDue(this.task);
  }
}
