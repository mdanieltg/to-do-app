import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDoTask } from '../to-do-task';
import { areEqualTasks as equal, getDefaultTask } from '../util';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() inputTask: ToDoTask = getDefaultTask();
  @Output() taskUpdatedEvent = new EventEmitter<ToDoTask>();
  @Output() taskDeletedEvent = new EventEmitter<number>();
  bufferTask: ToDoTask = getDefaultTask();

  constructor() {
  }

  saveTask(cancel = false): void {
    if (cancel) {
      this.taskUpdatedEvent.emit(this.inputTask);
    } else {
      this.bufferTask.title = this.bufferTask.title.trim();

      if (this.bufferTask.title === '') {
        return;
      }

      // Forzar descripción como undefined cuando está vacía
      {
        if (this.bufferTask.description !== undefined &&
          this.bufferTask.description.trim() === '') {
          this.bufferTask.description = undefined;
        }
      }

      // Forzar fecha como undefined cuando está vacía o es inválida
      if (this.bufferTask.dueDate !== undefined &&
        this.bufferTask.dueDate.toString().trim() === '') {
        this.bufferTask.dueDate = undefined;
      }

      this.taskUpdatedEvent.emit(equal(this.bufferTask, this.inputTask)
                                 ? this.inputTask
                                 : this.bufferTask);
    }
  }

  deleteTask(): void {
    this.taskDeletedEvent.emit(this.inputTask.id);
  }

  ngOnInit(): void {
    // Clonar this.inputTask para compararla al guardar
    this.bufferTask = Object.assign({}, this.inputTask);
  }

}
