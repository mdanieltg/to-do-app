import { Component, OnInit } from '@angular/core';
import { ToDoTask } from './to-do-task';
import { AppState } from './app-state';
import { readFromLocalStorage, writeToLocalStorage } from './util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lista de Tareas';
  toDoList: ToDoTask[] = [];
  doneList: ToDoTask[] = [];

  newTask(task: ToDoTask): void {
    if (!this.toDoList.includes(task)) {
      this.toDoList.unshift(task);
      this.saveState();
    }
  }

  completeTask(task: ToDoTask): void {
    const index = this.toDoList.indexOf(task);
    this.toDoList.splice(index, 1);
    this.doneList.unshift(task);
    this.saveState();
  }

  revertTask(task: ToDoTask): void {
    const index = this.doneList.indexOf(task);
    this.doneList.splice(index, 1);
    this.toDoList.unshift(task);
    this.saveState();
  }

  deleteTask(task: ToDoTask, list: ToDoTask[]): void {
    const index = list.indexOf(task);
    list.splice(index, 1);
    this.saveState();
  }

  private saveState(): void {
    const state: AppState = {
      toDo: this.toDoList,
      done: this.doneList
    };
    writeToLocalStorage('tasks', state);
  }

  ngOnInit(): void {
    const state = readFromLocalStorage<AppState>('tasks') ??
      {
        toDo: [],
        done: []
      };
    this.toDoList = state.toDo;
    this.doneList = state.done;
  }

}
