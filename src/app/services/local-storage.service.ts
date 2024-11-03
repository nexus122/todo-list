import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  checked: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private todosSubject: BehaviorSubject<any[]>;
  public todos$: Observable<any[]>;
  public LOCALKEY = 'todos';

  constructor() {
    this.todosSubject = new BehaviorSubject<any[]>([]);
    this.todos$ = this.todosSubject.asObservable();
  }

  saveOnLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string): any {
    const todos = localStorage.getItem(key);
    return todos ? JSON.parse(todos) : null;
  }

  loadInitialTodos(): void {
    const todos = this.getFromLocalStorage(this.LOCALKEY);
    this.todosSubject.next(todos);
  }

  addTodo(todo: Todo): void {
    const todos = this.todosSubject.value || [];
    todos.push(todo);
    this.saveOnLocalStorage(this.LOCALKEY, todos);
    this.todosSubject.next(todos);
  }

  removeTodo(id: string): void {
    const todos = this.todosSubject.value.filter((todo) => todo.id !== id);
    this.saveOnLocalStorage(this.LOCALKEY, todos);
    this.todosSubject.next(todos);
  }

  updateObservable(todos: any[]): void {
    this.saveOnLocalStorage(this.LOCALKEY, todos);
    this.todosSubject.next(todos);
  }
}
