import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task-service/task.service';
import { TaskItem } from '../task-item';
import { areEqualTasks as equal, DEFAULT_TASK, isPastDue } from '../utils/task-utils';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  originalTask: TaskItem = DEFAULT_TASK;
  task: TaskItem = DEFAULT_TASK;
  pastDueDate = false;
  confirmDelete = false;
  private timeout: any;

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
    if (this.confirmDelete) {
      clearInterval(this.timeout);

      this.taskService.removeTask(this.task.id);
      this.router.navigate(['/']);
    } else {
      this.confirmDelete = true;

      this.timeout = setTimeout(() => {
        this.confirmDelete = false;
      }, 2500);
    }
  }

  processDueDate(e: Event): void {
    const dueDateValue = (e.target as HTMLInputElement).value;

    if (/^\d{4}-\d{2}-\d{2}$/.test(dueDateValue)) {
      const date = new Date(dueDateValue.replace(/-/g, '/'));
      date.setDate(date.getDate() + 1);
      date.setMilliseconds(date.getMilliseconds() - 1);
      this.task.dueDate = date;
      this.pastDueDate = isPastDue(this.task);
    } else {
      this.task.dueDate = undefined;
      this.pastDueDate = false;
    }
  }

  setCompletedDate(): void {
    this.task.completionDate = this.task.completed
                               ? undefined
                               : new Date();
  }

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    const task = this.taskService.getTask(taskId);

    if (task === undefined) {
      this.router.navigate(['/']);
    } else {
      this.originalTask = task;
      this.task = { ...task };
      this.pastDueDate = isPastDue(task);
    }
  }
}
