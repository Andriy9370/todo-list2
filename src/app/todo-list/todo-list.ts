import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { ITodoItem } from "./todo-list.model";

@Directive()
export class TodoList {
    @Input() public inputList: ITodoItem[] = [];
    @Output() protected changeItem: EventEmitter<ITodoItem> = new EventEmitter<ITodoItem>();
    @Output() protected removeItem: EventEmitter<ITodoItem> = new EventEmitter<ITodoItem>();

    protected removeTask(item: ITodoItem) {
        this.removeItem.emit(item);
    }

    protected changeTaskStatus(item: ITodoItem) {
        this.changeItem.emit(item);
    }

    public get existsItem(): boolean{
        return this.inputList.length > 0 ? true : false;
    }
    
}