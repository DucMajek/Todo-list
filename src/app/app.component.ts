import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToDoItem } from './interfaces/app.interfaces';


@Component({
  selector: 'app-root',
  imports: [NgClass, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})

export class AppComponent {
  title = 'junior-frontend-developer-task';

  protected tasks = [
    { name: 'Zrobić zakupy spożywcze', status: 'Completed', date: '2025-05-12', showDescription: false, description: 'Muszę kupić mleko, mąkę i jajka.' },
    { name: 'Opłacić rachunki', status: 'Pending', date: '2025-05-10', showDescription: false, description: 'Tylko nie odkładaj tego na inny dzień!' },
    { name: 'Urodziny mamy', status: 'Planned', date: '2025-05-15', showDescription: false, description: 'Kupić kwiaty i tort.' }
  ];

  currentItem: ToDoItem = {
    taskName: '',
    description: '',
    status: 'Planned',
    deadline: ''
  };

  protected activeTaskIndex: number | null = null;
  protected showModal = false;
  protected todayDate: string = new Date().toISOString().split('T')[0];
  protected sortStatus = false;

  toggleCompleted(task: any) {
    task.status = task.status === 'Completed' ? 'Planned' : 'Completed';
  }

  toggleDescription(index: number) {
    this.activeTaskIndex = this.activeTaskIndex === index ? null : index;
  }

  sortTasksByName() {
    if (!this.sortStatus) {
      this.tasks.sort((b, a) => a.name.localeCompare(b.name));
      this.sortStatus = true;
    } else {
      this.tasks.sort((b, a) => b.name.localeCompare(a.name));
      this.sortStatus = false;
    }
  }

  sortTasksByStatus() {
    if (!this.sortStatus) {
      this.tasks.sort((b, a) => a.status.localeCompare(b.status));
      this.sortStatus = true;
    } else {
      this.tasks.sort((b, a) => b.status.localeCompare(a.status));
      this.sortStatus = false;
    }
  }

  sortTasksByDate() {
    if (!this.sortStatus) {
      this.tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.sortStatus = true;
    } else {
      this.tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.sortStatus = false;
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentItem = { taskName: '', description: '', status: 'Planned', deadline: '' };
  }

  addTask() {
    if (!this.currentItem.taskName || !this.currentItem.deadline) {
      return;
    }

    const newTask = {
      name: this.currentItem.taskName,
      description: this.currentItem.description,
      status: this.currentItem.status,
      date: this.currentItem.deadline,
      showDescription: false
    };

    this.tasks.push(newTask);

    this.currentItem = {
      taskName: '',
      description: '',
      status: 'Planned',
      deadline: ''
    };
    this.closeModal();
  }
}
