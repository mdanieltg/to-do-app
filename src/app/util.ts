import { TaskItem } from './task-item';

export const DEFAULT_TASK: TaskItem = {
  id: 0,
  title: '',
  important: false,
  description: undefined,
  dueDate: undefined,
  done: false
};

export function areEqualTasks(task1: TaskItem, task2: TaskItem): boolean {
  if (task1.id === task2.id &&
    task1.title === task2.title &&
    task1.important === task2.important &&
    task1.description === task2.description &&
    task1.dueDate === task2.dueDate) {
    return true;
  }

  return false;
}

export function generateRandomId(): number {
  return Math.floor(Math.random() * 1000000000000);
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
