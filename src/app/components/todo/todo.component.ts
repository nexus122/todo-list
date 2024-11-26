import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodolistService } from '../../services/todolist.service';
import { NgIf } from '@angular/common';
import { Todo } from '../../services/local-storage.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() checked: boolean = false;
  @Input() subtasks: Todo[] = [];

  constructor(private todo: TodolistService) {}

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
