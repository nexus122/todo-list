import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { TodolistService } from '../../services/todolist.service';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  constructor(
    private local: LocalStorageService,
    private todo: TodolistService
  ) {}
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() checked: boolean = false;

  deleteTodo(id: number): void {
    this.todo.removeTodo(id);
  }

  checkTodo(id: number): void {
    this.todo.checkTodo(id);
  }

  changeTitle(id: number, title: string): void {
    this.todo.changeTitle(id, title);
  }
}
