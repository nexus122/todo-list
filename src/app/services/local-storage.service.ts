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

  updateObservable(todos: any[]): void {
    this.saveOnLocalStorage(this.LOCALKEY, todos);
    this.todosSubject.next(todos);
  }
}
