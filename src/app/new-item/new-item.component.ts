import { Component, EventEmitter, Output } from '@angular/core';
import { ToDoTask } from '../to-do-task';
import { generateRandomId as newId } from '../util';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent {
  taskTitle = '';
  important = false;
  prototypeTask: ToDoTask | undefined;
  @Output() newItemEvent = new EventEmitter<ToDoTask>();

  constructor() {
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
      this.prototypeTask = {
        id: newId(),
        title: this.taskTitle,
        important: this.important,
        dueDate: undefined,
        description: undefined
      };

      this.newItemEvent.emit(this.prototypeTask);
    }

    this.taskTitle = '';
    this.important = false;
  }

}
