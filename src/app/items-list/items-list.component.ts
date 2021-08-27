import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task-service/task.service';
import { TaskItem } from '../task-item';
import { OptionsService } from '../options-service/options.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  title = 'Lista de Tareas';
  tasks: TaskItem[] = [];
  completedTasks: TaskItem[] = [];
  displayCompletedTasks = false;

  constructor(private router: Router,
              private optionsService: OptionsService,
              private taskService: TaskService) {
  }

  selectTask(taskId: number): void {
    this.router.navigate([`detalle/${taskId}`]);
  }

  updateTask(task: TaskItem): void {
    this.taskService.updateTask(task);
    this.reload();
  }

  deleteTask(taskId: number): void {
    this.taskService.removeTask(taskId);
    this.reload();
  }

  reload(): void {
    this.taskService.reload();
    this.tasks = this.taskService.getNotCompletedTasks();

    if (this.displayCompletedTasks) {
      this.completedTasks = this.taskService.getCompletedTasks();
    }
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getNotCompletedTasks();
    this.displayCompletedTasks = this.optionsService.getOptions().displayCompletedTasks;

    if (this.displayCompletedTasks) {
      this.completedTasks = this.taskService.getCompletedTasks();
    }
  }
}
