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
    taskA.dueDate === taskB.dueDate &&
    taskA.completed === taskB.completed &&
    taskA.completionDate === taskB.completionDate;
}

export function isPastDue(task: TaskItem): boolean {
  if (task.dueDate) {
    return task.dueDate < new Date();
  } else {
    return false;
  }
}
