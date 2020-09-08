import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditingABookComponent } from './dialog-editing-a-book.component';

describe('DialogEditingABookComponent', () => {
  let component: DialogEditingABookComponent;
  let fixture: ComponentFixture<DialogEditingABookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditingABookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditingABookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
