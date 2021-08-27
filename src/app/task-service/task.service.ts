import { Injectable } from '@angular/core';
import { TaskItem } from '../task-item';
import { readFromLocalStorage, writeToLocalStorage } from '../utils/storage-utils';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly ListName = 'tasks';
  private tasks: TaskItem[];

  constructor() {
    const tasks = readFromLocalStorage<TaskItem[]>(this.ListName);
    this.tasks = tasks || [];
  }

  private save(): void {
    writeToLocalStorage<TaskItem[]>(this.ListName, this.tasks);
  }

  reload(): TaskItem[] {
    const tasks = readFromLocalStorage<TaskItem[]>(this.ListName);
    this.tasks = tasks || [];
    return this.tasks;
  }

  getTasks(): TaskItem[] {
    return this.tasks;
  }

  getCompletedTasks(): TaskItem[] {
    return this.tasks.filter(t => t.completed);
  }

  getNotCompletedTasks(): TaskItem[] {
    return this.tasks.filter(t => !t.completed);
  }

  getTask(taskId: number): TaskItem | undefined {
    return this.tasks.find(t => t.id === taskId);
  }

  addTask(task: TaskItem): void {
    do {
      // Assign pseudorandom number
      task.id = Math.floor(Math.random() * 1000000000000);
    } while (this.tasks.some(t => t.id === task.id));

    this.tasks.push(task);
    this.save();
  }

  removeTask(taskId: number): void {
    const index = this.tasks.findIndex(t => t.id === taskId);
    this.tasks.splice(index, 1);
    this.save();
  }

  updateTask(task: TaskItem): void {
    const itemToUpdate = this.tasks.find(t => t.id === task.id);

    if (itemToUpdate) {
      itemToUpdate.title = task.title;
      itemToUpdate.important = task.important;
      itemToUpdate.dueDate = task.dueDate;
      itemToUpdate.description = task.description;
      itemToUpdate.completed = task.completed;
      itemToUpdate.completionDate = task.completionDate;

      this.save();
    }
  }
}
