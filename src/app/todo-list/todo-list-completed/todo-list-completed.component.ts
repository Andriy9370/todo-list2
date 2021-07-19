import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TodoList } from '../todo-list';

@Component({
  selector: 'app-todo-list-completed',
  templateUrl: './todo-list-completed.component.html',
  styleUrls: ['./todo-list-completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListCompletedComponent extends TodoList implements OnInit {

  constructor() { 
    super()
  }

  ngOnInit(): void {
  }

}
