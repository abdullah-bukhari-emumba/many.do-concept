import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoFormComponent} from './todo-form/todo-form.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, TodoListComponent, TodoFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'many.do.v0.1';

  @ViewChild('#todoList') exTrigger: any;

}
