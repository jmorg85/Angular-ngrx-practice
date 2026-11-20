import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from './task.reducer';
import { addTask, updateTask, deleteTask } from './task.actions';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  imports: [NgFor, AsyncPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  tasks: Task[] = [];

  constructor(private store: Store<{ tasks: AppState }>) {
  this.store.select(state => state.tasks.tasks).subscribe(tasks => {
    this.tasks = tasks;
  });
}

  addNewTask() {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title: 'New Task',
      description: 'This is a new task.'
    };
    this.store.dispatch(addTask({ task: newTask }));
  }

  updateTask(task: Task) {
    const updatedTask: Task = { ...task, title: 'Updated Task', description: 'This task has been updated.' };
    this.store.dispatch(updateTask({ task: updatedTask }));
  }

  deleteTask(id: number) {
    this.store.dispatch(deleteTask({ id }));
  }
}