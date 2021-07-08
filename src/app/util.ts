import { TaskItem } from './task-item';

export const DEFAULT_TASK: TaskItem = {
  id: 0,
  title: '',
  important: false,
  description: undefined,
  dueDate: undefined,
  done: false
};

export function areEqualTasks(taskA: TaskItem, taskB: TaskItem): boolean {
  return taskA.id === taskB.id &&
    taskA.title === taskB.title &&
    taskA.important === taskB.important &&
    taskA.description === taskB.description &&
    taskA.dueDate === taskB.dueDate;
}

export function writeToLocalStorage<T>(name: string, item: T): void {
  localStorage.setItem(name, JSON.stringify(item));
}

export function readFromLocalStorage<T>(name: string): T | null {
  const item = localStorage.getItem(name);
  return item
         ? JSON.parse(item)
         : null;
}
