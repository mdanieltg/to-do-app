import { TaskItem } from '../task-item';

export const DEFAULT_TASK: TaskItem = {
  id: 0,
  title: '',
  important: false,
  description: undefined,
  dueDate: undefined,
  completed: false,
  completionDate: undefined
};

export function areEqualTasks(taskA: TaskItem, taskB: TaskItem): boolean {
  return taskA.id === taskB.id &&
    taskA.title === taskB.title &&
    taskA.important === taskB.important &&
    taskA.description === taskB.description &&
    taskA.dueDate?.toISOString() === taskB.dueDate?.toISOString() &&
    taskA.completed === taskB.completed &&
    taskA.completionDate?.toISOString() === taskB.completionDate?.toISOString();
}

export function isPastDue(task: TaskItem): boolean {
  if (task.dueDate) {
    return task.dueDate < new Date();
  } else {
    return false;
  }
}
