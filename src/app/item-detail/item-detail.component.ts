import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task-service/task.service';
import { TaskItem } from '../task-item';
import { areEqualTasks as equal, DEFAULT_TASK } from '../util';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  originalTask: TaskItem = DEFAULT_TASK;
  task: TaskItem = DEFAULT_TASK;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private taskService: TaskService) {
  }

  saveChanges(): void {
    this.task.title = this.task.title.trim();

    if (this.task.title !== '') {
      // Forzar descripción como undefined cuando está vacía
      {
        if (this.task.description !== undefined &&
          this.task.description.trim() === '') {
          this.task.description = undefined;
        }
      }

      // Forzar fecha como undefined cuando está vacía o es inválida
      if (this.task.dueDate !== undefined &&
        this.task.dueDate.toString().trim() === '') {
        this.task.dueDate = undefined;
      }

      if (!equal(this.task, this.originalTask)) {
        this.taskService.updateTask(this.task);
        this.router.navigate(['/']);
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  deleteTask(): void {
    this.taskService.removeTask(this.task.id);
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    const task = this.taskService.getTask(taskId);

    if (task === undefined) {
      this.router.navigate(['/']);
    } else {
      this.originalTask = task;

      // Clonar this.inputTask para compararla al guardar
      this.task = Object.assign({}, task);
    }
  }
}
