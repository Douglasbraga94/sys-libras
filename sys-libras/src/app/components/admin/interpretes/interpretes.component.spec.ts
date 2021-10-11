import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpretesComponent } from './interpretes.component';

describe('InterpretesComponent', () => {
  let component: InterpretesComponent;
  let fixture: ComponentFixture<InterpretesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpretesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpretesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
