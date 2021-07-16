export interface TaskItem {
  id: number;
  title: string;
  important: boolean;
  dueDate: string | undefined;
  description: string | undefined;
  completed: boolean;
  completionDate: Date | undefined;
}
