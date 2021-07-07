import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task-service/task.service';
import { ToDoTask } from '../to-do-task';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  title = 'Lista de Tareas';
  tasks: ToDoTask[] = [];

  constructor(private router: Router,
              private taskService: TaskService) {
  }

  selectTask(taskId: number): void {
    this.router.navigate([`detalle/${taskId}`]);
  }

  updateTask(task: ToDoTask): void {
    this.taskService.updateTask(task);
    this.reload();
  }

  deleteTask(taskId: number): void {
    this.taskService.removeTask(taskId);
    this.reload();
  }

  reload(): void {
    this.tasks = this.taskService.reload();
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }
}
