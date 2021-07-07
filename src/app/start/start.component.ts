import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task-service/task.service';
import { ToDoTask } from '../to-do-task';
import { DEFAULT_TASK } from '../util';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  title = 'Lista de Tareas';
  tasks: ToDoTask[] = [];
  selectedTask: ToDoTask = DEFAULT_TASK;
  editing = false;

  constructor(private taskService: TaskService) {
  }

  selectTask(task: ToDoTask): void {
    this.selectedTask = task;
    this.editing = true;
  }

  completeTask(taskId: number): void {
    this.taskService.completeTask(taskId);
    this.reload();
  }

  revertTask(taskId: number): void {
    this.taskService.deCompleteTask(taskId);
    this.reload();
  }

  updateTask(task: ToDoTask): void {
    this.editing = false;
    if (this.selectedTask !== task) {
      this.selectedTask.title = task.title;
      this.selectedTask.important = task.important;
      this.selectedTask.description = task.description;
      this.selectedTask.dueDate = task.dueDate;
    }
  }

  deleteTask(taskId: number): void {
    this.taskService.removeTask(taskId);
    this.reload();
  }

  deleteTaskFromDetail(taskId: number): void {
    this.editing = false;
    this.taskService.removeTask(taskId);
    this.reload();
  }

  reload(): void {
    this.tasks = this.taskService.reload();
    console.log('Reload', this.tasks);
  }

  private saveState(): void {
    console.log('State saved:', this.tasks);
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    console.log('start.onInit');
  }
}
