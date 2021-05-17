export interface ToDoTask {
  id: number;
  title: string;
  important: boolean;
  dueDate: Date | undefined;
  description: string | undefined;
}
