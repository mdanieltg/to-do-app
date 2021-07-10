import { Component, EventEmitter, Output } from '@angular/core';
import { TaskItem } from '../task-item';
import { TaskService } from '../task-service/task.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent {
  taskTitle = '';
  important = false;
  @Output() newItemEvent = new EventEmitter<TaskItem>();

  constructor(private taskService: TaskService) {
  }

  toggleImportance(e: MouseEvent): void {
    e.preventDefault();
    this.important = !this.important;
  }

  captureEnterKey(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.createTask();
    }
  }

  createTask(): void {
    this.taskTitle = this.taskTitle.trim();

    if (this.taskTitle.length !== 0) {
      const task: TaskItem = {
        id: 0,
        title: this.taskTitle,
        important: this.important,
        dueDate: undefined,
        description: undefined,
        completed: false
      };

      this.taskService.addTask(task);
      this.newItemEvent.emit(task);
    }

    this.taskTitle = '';
    this.important = false;
  }

}
