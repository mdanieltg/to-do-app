export interface TaskItem {
  id: number;
  title: string;
  important: boolean;
  dueDate: Date | undefined;
  description: string | undefined;
  completed: boolean;
}
