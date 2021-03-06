import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Itask } from 'src/app/models/model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm !: FormGroup;
  tasks : Itask [] =[];
  inprogress: Itask [] = [];
  completed: Itask[] = [];
  updateId !: any;
  isEditEnabled: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    })
}
  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    });
    this.todoForm.reset();
  }
  drop(event: CdkDragDrop<Itask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}

updateTask() {
  this.tasks[this.updateId].description = this.todoForm.value.item;
  this.tasks[this.updateId].done = false;
  this.todoForm.reset();
  this.updateId = undefined;
  this.isEditEnabled = false;
}
onEdit(item: Itask, i : number): void {
  this.todoForm.controls['item'].setValue(item.description);
  this.updateId = i;
  this.isEditEnabled = true;
}
deleteTask(i: number){
  this.tasks.splice(i, 1);
}
deleteInprogressTask(i: number){
  this.inprogress.splice(i, 1);
}
deleteCompletedTask(i: number){
  this.completed.splice(i, 1);
}
}
