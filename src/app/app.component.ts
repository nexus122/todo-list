import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { LocalStorageService, Todo } from './services/local-storage.service';
import { NgIf, NgFor } from '@angular/common';
import { TodolistService } from './services/todolist.service';
import { TabsComponent } from './components/tabs/tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodoComponent,
    AddFormComponent,
    TabsComponent,
    NgIf,
    NgFor,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private local: LocalStorageService,
    private todo: TodolistService
  ) {}
  public todoList: Todo[] = [];
  public activeTab: boolean = true;

  ngOnInit(): void {
    this.todo.loadInitialTodos();
    this.local.todos$.subscribe((value) => {
      this.todoList = value;
      if (!this.activeTab) {
        this.filterCheckedTodos();
      }
    });
  }

  filterCheckedTodos(): void {
    this.todoList = this.todoList.filter((todo) => !todo.checked);
  }

  setActiveTab(tab: boolean): void {
    console.log(tab);
    tab ? this.todo.loadInitialTodos() : this.filterCheckedTodos();
  }
}
