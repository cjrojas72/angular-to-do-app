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
  tagsList: string[] = [];
  originalTaskList: Task[] = [];
  filteredTaskList: Task[] = [];

  isShowAllTags: boolean = true;
  filterType: string = 'all';
  selectedTag: string = 'all';

  taskObj: Task;
  jsonData: any;

  constructor(private taskService:  TaskService){
    this.taskObj = new Task();
    const localData = localStorage.getItem('ToDoApp');

    if(localData){
      this.taskList = JSON.parse(localData);
      this.originalTaskList = this.taskList;
    }
  }

  createNewTask(){
    //debugger;
    const task = JSON.stringify(this.taskObj);
    const parseTask = JSON.parse(task);

    this.taskList.push(parseTask);
    this.originalTaskList = this.taskList;
    this.updateTagsList(parseTask.tags);
    const uTaskList = JSON.stringify(this.taskList);



    localStorage.setItem('ToDoApp', uTaskList);
    this.originalTaskList = this.taskList;
  }

  onTaskComplete(){
    //debugger;
    const updatedTaskList = this.taskList;
    
    localStorage.setItem('ToDoApp', JSON.stringify(updatedTaskList));
    this.originalTaskList = this.taskList;
  }

  onRemove(index: number){
    //debugger
    const updatedTaskList = this.taskList.splice(index, 1);
    localStorage.setItem('ToDoApp', JSON.stringify(updatedTaskList));
    this.originalTaskList = this.taskList;
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


    if(this.filterType == 'all'){
      this.taskList = this.originalTaskList;
    }
    else if(this.filterType == 'completed'){
      
      this.taskList = this.originalTaskList;
      this.filteredTaskList = this.taskList.filter((task) => task.isCompleted === true);
      this.taskList = this.filteredTaskList;
    }
    else if(this.filterType == 'in-progress'){

      
      this.taskList = this.originalTaskList;
      this.filteredTaskList = this.taskList.filter((task) => task.isCompleted === false);
      this.taskList = this.filteredTaskList;
    }
    else{
      return;
    }


  }

  setTagFilter(value: string){
    this.selectedTag = value;
  }

  updateTagsList(value:string){
    //console.log(tags);
    let tlist: string[] = this.getCommaSeperatedValues(value);
    tlist.forEach( tag => {
      this.tagsList.push(tag);
    })

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
