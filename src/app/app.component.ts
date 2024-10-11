import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/data.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DatePipe, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-to-do-app';
  taskList: Task[] = [];

  taskObj: Task;
  jsonData: any;

  constructor(private taskService:  TaskService){
    this.taskObj = new Task();
    const localData = localStorage.getItem('ToDoApp');

    if(localData){
      this.taskList = JSON.parse(localData);
    }
  }

  createNewTask(){
    //debugger;
    const task = JSON.stringify(this.taskObj);
    const parseTask = JSON.parse(task);

    this.taskList.push(parseTask);
    const uTaskList = JSON.stringify(this.taskList);

    localStorage.setItem('ToDoApp', uTaskList);
  }


  ngOnInit(){
    this.taskService.getTasks().subscribe((data: any) => {
      this.jsonData = data;
      console.log(this.jsonData);
    })
  }
}

export class Task{
  taskName: string;
  dueDate: string;
  tags: string;

  constructor(){
    this.taskName = '';
    this.dueDate = '';
    this.tags = '';
  }
}
