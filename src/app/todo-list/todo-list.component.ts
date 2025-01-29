import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Todo, TodoResponse, TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';
// import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  editingTodo: Todo | null = null;
  editingTodoValue = '';
  private getTodos: any = JSON.parse(localStorage.getItem('todos') as string);
  private setTodos(updatedTodos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }


  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    console.log('loading todos');
    this.todos = this.todoService.getAllTodos() || [];
  }

  deleteTodo(id: number | string) {
    this.todoService.deleteTodo(id);
    this.loadTodos();
  }

  toggleTodo(todo: Todo) {
    const updated = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(updated);
    this.loadTodos();
  }

  editTodo(todo: Todo) {
    this.editingTodo = todo;
    this.editingTodoValue = todo.todo;
  }

  updateTodo(todo: Todo) {
    const updated = { ...todo, todo: this.editingTodoValue };
    this.todoService.updateTodo(updated);
    this.editingTodo = null;
    this.loadTodos();
  }
  
}
