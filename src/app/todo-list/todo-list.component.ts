import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { ITodoItem } from './todo-list.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  public form: FormGroup;

  public todoList: ITodoItem[] = [];
  public completedList: ITodoItem[] = [];
  public incompleteList: ITodoItem[] = [];

  private _messageError: string = '';
  private _keyLS: string = 'todoList';
  private _inputItem: AbstractControl;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getLocalStorage();

    this.form = this.fb.group({
      inputItem: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,}.*')])
    });
    this._inputItem = this.form.controls.inputItem;
    this._inputItem.valueChanges.pipe(filter(val => val?.length == 0)).subscribe(() => this.messageError = '')  
  }

  public addNewItem() {
    if (!this.itemExists) {
      this.messageError = '';

      this.todoList.push({
        itemID: this.uniqueIndex,
        itemName: this._inputItem.value,
        signCompleted: false,
        itemEdit: false
      });

      this._inputItem.reset();
      this.updateData();
    }
    else {
      this.messageError = 'this todo already exists';
    }
  }

  public removeItem(item: ITodoItem) {
    this.todoList = this.todoList.filter(val => val.itemID !== item.itemID);
    this.updateData();
  }

  public changeItem(item: ITodoItem) {
    this.todoList.find(val => val.itemID == item.itemID).signCompleted = item.signCompleted;
    this.updateData();
  }

  public editTask(item: ITodoItem) {
    this.todoList.find(val => val.itemID == item.itemID).signCompleted = item.signCompleted;
    this.updateData();
  }

  private get itemExists(): boolean {
    return this.todoList.some(val => val.itemName == this._inputItem.value);
  }

  private updateLocalStorage() {
    localStorage.setItem(this._keyLS, JSON.stringify(this.todoList));
  }

  private getLocalStorage() {
    if (localStorage.length > 0) {
      this.todoList = JSON.parse(localStorage.getItem(this._keyLS));
      this.updateData();
    }
  }

  private get uniqueIndex(): number {
    let maxIndex = Math.max.apply(Math, this.todoList.map(val => val.itemID));
    return this.todoList.length > 0 ? ++maxIndex : 1;
  }

  private updateData() {
    this.incompleteList = [...this.todoList.filter(val => !val.signCompleted)];
    this.completedList = [...this.todoList.filter(val => val.signCompleted)];
    this.updateLocalStorage();
  }

  // error functions
  public set messageError(message: string) {
    this._messageError = message;
  }

  public get messageError(): string {
    return this._messageError;
  }

}