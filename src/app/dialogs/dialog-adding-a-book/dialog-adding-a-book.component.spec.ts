import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddingABookComponent } from './dialog-adding-a-book.component';

describe('DialogAddingABookComponent', () => {
  let component: DialogAddingABookComponent;
  let fixture: ComponentFixture<DialogAddingABookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddingABookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddingABookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
