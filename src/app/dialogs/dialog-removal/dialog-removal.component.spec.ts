import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemovalComponent } from './dialog-removal.component';

describe('DialogRemovalComponent', () => {
  let component: DialogRemovalComponent;
  let fixture: ComponentFixture<DialogRemovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRemovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
