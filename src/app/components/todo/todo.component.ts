import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  constructor(private local: LocalStorageService) {}
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() checked: boolean = false;
  deleteTodo(id: string) {
    this.local.removeTodo(id);
  }
  checkTodo(id: string): void {
    const todo = this.local.getFromLocalStorage(this.local.LOCALKEY);
    const updatedTodo = todo.map((item: any) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    this.local.updateObservable(updatedTodo);
  }
  changeTitle(id: string, title: string): void {
    const todo = this.local.getFromLocalStorage(this.local.LOCALKEY);
    const updatedTodo = todo.map((item: any) => {
      if (item.id === id) {
        item.title = title;
      }
      return item;
    });
    this.local.updateObservable(updatedTodo);
  }
}
