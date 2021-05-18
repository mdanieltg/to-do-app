import { ToDoTask } from './to-do-task';

export interface AppState {
  toDo: ToDoTask[];
  done: ToDoTask[];
}
