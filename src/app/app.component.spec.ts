import { AppComponent } from './app.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LocalStorageService } from './services/local-storage.service';
import { TodolistService } from './services/todolist.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let localStorageService: jasmine.SpyObj<LocalStorageService>;
    let todolistService: jasmine.SpyObj<TodolistService>;

    beforeEach(async () => {
      const localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
        'todos$',
      ]);
      const todolistSpy = jasmine.createSpyObj('TodolistService', [
        'loadInitialTodos',
      ]);

      await TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [
          { provide: LocalStorageService, useValue: localStorageSpy },
          { provide: TodolistService, useValue: todolistSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      localStorageService = TestBed.inject(
        LocalStorageService
      ) as jasmine.SpyObj<LocalStorageService>;
      todolistService = TestBed.inject(
        TodolistService
      ) as jasmine.SpyObj<TodolistService>;

      localStorageService.todos$ = of([]);
    });

    it('should create the app', () => {
      expect(component).toBeTruthy();
    });

    it('should load initial todos on init', () => {
      component.ngOnInit();
      expect(todolistService.loadInitialTodos).toHaveBeenCalled();
    });

    it('should subscribe to todos$ on init', () => {
      const todos = [{ id: 1, title: 'Test Todo', checked: false }];
      (localStorageService.todos$ as unknown as jasmine.Spy).and.returnValue(
        of(todos)
      );

      component.ngOnInit();
      expect(component.todoList).toEqual(todos);
    });

    it('should filter checked todos', () => {
      component.todoList = [
        { id: 1, title: 'Test Todo 1', checked: false },
        { id: 2, title: 'Test Todo 2', checked: true },
      ];

      component.filterCheckedTodos();
      expect(component.todoList).toEqual([
        { id: 1, title: 'Test Todo 1', checked: false },
      ]);
    });

    it('should set active tab and load todos', () => {
      spyOn(component, 'filterCheckedTodos');

      component.setActiveTab(true);
      expect(component.activeTab).toBeTrue();
      expect(todolistService.loadInitialTodos).toHaveBeenCalled();

      component.setActiveTab(false);
      expect(component.activeTab).toBeFalse();
      expect(component.filterCheckedTodos).toHaveBeenCalled();
    });
  });
});
