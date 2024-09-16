import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarRegistroComponent } from './validar-registro.component';

describe('ValidarRegistroComponent', () => {
  let component: ValidarRegistroComponent;
  let fixture: ComponentFixture<ValidarRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
