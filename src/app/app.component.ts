import { Component } from '@angular/core';
import { ToDoTask } from './to-do-task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lista de Tareas';
  taskList: ToDoTask[] = [];
  completedTaskList: ToDoTask[] = [];

  newTask(task: ToDoTask): void {
    if (!this.taskList.includes(task)) {
      this.taskList.unshift(task);
    }
  }

  completeTask(task: ToDoTask): void {
    const index = this.taskList.indexOf(task);
    this.taskList.splice(index, 1);
    this.completedTaskList.unshift(task);
  }

  revertTask(task: ToDoTask): void {
    const index = this.completedTaskList.indexOf(task);
    this.completedTaskList.splice(index, 1);
    this.taskList.unshift(task);
  }
}
