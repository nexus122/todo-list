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
  private todosSubject: BehaviorSubject<Todo[]>;
  public todos$: Observable<Todo[]>;
  public LOCALKEY = 'todos';

  constructor() {
    this.todosSubject = new BehaviorSubject<Todo[]>([]);
    this.todos$ = this.todosSubject.asObservable();
  }

  saveOnLocalStorage(key: string, value: Todo[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string): Todo[] | null {
    const todos = localStorage.getItem(key);
    return todos ? JSON.parse(todos) : null;
  }

  updateObservable(todos: Todo[]): void {
    this.saveOnLocalStorage(this.LOCALKEY, todos);
    this.todosSubject.next(todos);
  }
}
