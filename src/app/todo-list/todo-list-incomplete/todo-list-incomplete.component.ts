import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { TodoList } from '../todo-list';
import { ITodoItem } from '../todo-list.model';

@Component({
  selector: 'app-todo-list-incomplete',
  templateUrl: './todo-list-incomplete.component.html',
  styleUrls: ['./todo-list-incomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoListIncompleteComponent extends TodoList{
  @Output() public editTask: EventEmitter<ITodoItem> = new EventEmitter<ITodoItem>();
  editOriginalItemValue: string = null;

  constructor() {
    super()
  }

  public startEditTask(item: ITodoItem) {
    this.resetEdit();
    item.itemEdit = true;
    this.editOriginalItemValue = item.itemName;
  }

  public endEditTask(item: ITodoItem) {
    this.inputList.find(value => value.itemID == item.itemID).itemName = item.itemName;
    this.resetEdit();
    this.editTask.emit(item);
  }

  public undoEditTask() {
    this.inputList.find(value => value.itemEdit).itemName = this.editOriginalItemValue;
    this.resetEdit();
  }

  resetEdit(){
    let index = this.inputList.findIndex(value => value.itemEdit);
    if(index > -1) {
      this.inputList[index].itemEdit = false;
    }
  }

}
