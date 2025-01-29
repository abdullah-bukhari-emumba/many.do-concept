import { Component, EventEmitter, Output } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-todo-form',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  @Output() todoCreated = new EventEmitter<void>();

  todo: Todo = {
    todo: '',
    completed: false,
    id: uuid(),
    userId: uuid(),
  };
  constructor(private todoService: TodoService) {}

  createTodo(todo: Todo) {
    console.log('Todo created', todo);
    this.todoService.createTodo(todo);
    this.todoCreated.emit();
    this.todo = {
      todo: '',
      completed: false,
      id: uuid(),
      userId: uuid(),
    }
  }
}
