import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { LocalStorageService } from './services/local-storage.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoComponent, AddFormComponent, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private local: LocalStorageService) {}
  public todoList: any[] = [];
  public activeTab: boolean = true;

  ngOnInit(): void {
    this.local.loadInitialTodos();
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
    this.activeTab = tab;
    tab ? this.local.loadInitialTodos() : this.filterCheckedTodos();
  }
}
