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
  tagsList: string[] = ['Work', 'Health', 'Fitness'];

  isShowAllTags: boolean = true;
  filterType: string = 'all';

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

  onTaskComplete(){
    //debugger;
    const updatedTaskList = this.taskList;
    
    localStorage.setItem('ToDoApp', JSON.stringify(updatedTaskList));
  }

  onRemove(index: number){
    //debugger
    const updatedTaskList = this.taskList.splice(index, 1);
    localStorage.setItem('ToDoApp', JSON.stringify(updatedTaskList));
  }

  getCommaSeperatedValues(value: string): string[]{
    const tags = value.split(',');
    return tags
  }

  toggleShowAllTags(){
    this.isShowAllTags = !this.isShowAllTags;
  }

  setFilter(value: string){
    this.filterType = value;
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
  isCompleted: boolean;

  constructor(){
    this.taskName = '';
    this.dueDate = '';
    this.tags = '';
    this.isCompleted = false;
  }
}
