import { TaskItem } from '../task-item';

export const DEFAULT_TASK: TaskItem = {
  id: 0,
  title: '',
  important: false,
  description: undefined,
  dueDate: undefined,
  completed: false
};

export function areEqualTasks(taskA: TaskItem, taskB: TaskItem): boolean {
  return taskA.id === taskB.id &&
    taskA.title === taskB.title &&
    taskA.important === taskB.important &&
    taskA.description === taskB.description &&
    taskA.dueDate === taskB.dueDate;
}
