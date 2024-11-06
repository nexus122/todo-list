import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Todo } from './local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  constructor(private local: LocalStorageService) {}
  loadInitialTodos(): void {
    const todos = this.local.getFromLocalStorage(this.local.LOCALKEY);
    this.local.updateObservable(todos);
  }

  addTodo(todo: Todo): void {
    const todos = this.local.getFromLocalStorage(this.local.LOCALKEY) || [];
    todos.push(todo);
    this.local.updateObservable(todos);
  }

  removeTodo(id: number): void {
    const todos = this.local
      .getFromLocalStorage(this.local.LOCALKEY)
      .filter((todo: Todo) => todo.id !== id);
    this.local.updateObservable(todos);
  }

  checkTodo(id: number): void {
    const todos = this.local.getFromLocalStorage(this.local.LOCALKEY);
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
      return todo;
    });
    this.local.updateObservable(updatedTodos);
  }

  changeTitle(id: number, title: string): void {
    const todos = this.local.getFromLocalStorage(this.local.LOCALKEY);
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });
    this.local.updateObservable(updatedTodos);
  }
}