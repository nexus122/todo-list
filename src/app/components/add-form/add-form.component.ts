import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../services/local-storage.service';
import { TodolistService } from '../../services/todolist.service';
@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent {
  title: string = '';
  checked: boolean = false;
  constructor(private todo: TodolistService) {}

  addTask() {
    let todo: Todo = {
      id: Date.now() + Math.floor(Math.random() * 10),
      title: this.title,
      checked: this.checked,
    };
    this.todo.addTodo(todo);
    this.clearForm();
  }

  clearForm() {
    this.title = '';
    const titleInput = document.querySelector(
      'input[name="title"]'
    ) as HTMLInputElement;
    if (titleInput) {
      titleInput.focus();
    }
  }
}
