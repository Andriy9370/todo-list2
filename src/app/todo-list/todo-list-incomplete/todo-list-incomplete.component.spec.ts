import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListIncompleteComponent } from './todo-list-incomplete.component';

describe('TodoListIncompleteComponent', () => {
  let component: TodoListIncompleteComponent;
  let fixture: ComponentFixture<TodoListIncompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListIncompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListIncompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
