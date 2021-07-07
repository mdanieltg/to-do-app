import { Injectable } from '@angular/core';
import { ToDoTask } from '../to-do-task';
import { generateRandomId, readFromLocalStorage, writeToLocalStorage } from '../util';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly ListName = 'tasks';
  private tasks: ToDoTask[];

  constructor() {
    const tasks = readFromLocalStorage<ToDoTask[]>(this.ListName);
    this.tasks = tasks ?? [];
  }

  private save(): void {
    writeToLocalStorage<ToDoTask[]>(this.ListName, this.tasks);
  }

  reload(): ToDoTask[] {
    const tasks = readFromLocalStorage<ToDoTask[]>(this.ListName);
    this.tasks = tasks ?? [];
    return this.tasks;
  }

  getTasks(): ToDoTask[] {
    return this.tasks;
  }

  getTask(taskId: number): ToDoTask | undefined {
    return this.tasks.find(t => t.id === taskId);
  }

  addTask(task: ToDoTask): void {
    do {
      task.id = generateRandomId();
    } while (this.tasks.some(t => t.id === task.id));

    this.tasks.push(task);
    this.save();
  }

  removeTask(taskId: number): void {
    const index = this.tasks.findIndex(t => t.id === taskId);
    this.tasks.splice(index, 1);
    this.save();
  }

  updateTask(task: ToDoTask): void {
    const itemToUpdate = this.tasks.find(t => t.id === task.id);

    if (itemToUpdate) {
      itemToUpdate.title = task.title;
      itemToUpdate.important = task.important;
      itemToUpdate.dueDate = task.dueDate;
      itemToUpdate.description = task.description;
      itemToUpdate.done = task.done;

      this.save();
    }
  }
}
