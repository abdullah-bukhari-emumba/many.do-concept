import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // private apiURL = 'https://dummyjson.com/todos';
  private Todos: Todo[] = [];
  private getTodos() { // do not call this again and again 
    const stored = localStorage.getItem('todos');
    console.log('stored', stored);
    this.Todos = stored ? JSON.parse(stored) : [];
  }
  private setTodos() { // name should be save todos
    localStorage.setItem('todos', JSON.stringify(this.Todos));
    // this.getTodos();
  }

  constructor(private http: HttpClient) {}

  getAllTodos() {
    // return this.http.get<TodoResponse>(`${this.apiURL}`)
    this.getTodos();
    return this.Todos;
  }

  getTodoById(id: string | number) {
    // return this.http.get(`${this.apiURL}/user/${id}`)
    this.getTodos();
    return this.Todos.find((t: Todo) => t.id === id);
  }

  createTodo(todo: Todo) {
    // return this.http.post(`${this.apiURL}/add`, todo)
    this.Todos.push(todo);
    this.setTodos();
  }

  updateTodo(todo: Todo) {
    // return this.http.put(`${this.apiURL}/${todo.id}`, {
    //   'completed': todo.completed,
    //   'userId': todo.userId,
    // })
    const index = this.Todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.Todos.splice(index, 1, todo);
    }
    this.setTodos();
  }

  deleteTodo(id: string | number) {
    // return this.http.delete(`${this.apiURL}/${id}`)
    this.Todos = this.Todos.filter((t: Todo) => t.id !== id);
    this.setTodos();
  }
}

export interface Todo {
  id: number | string;
  todo: string;
  completed: boolean;
  userId: number | string;
}

export interface TodoResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}
