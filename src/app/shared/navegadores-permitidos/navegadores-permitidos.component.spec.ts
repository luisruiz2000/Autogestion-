import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegadoresPermitidosComponent } from './navegadores-permitidos.component';

describe('NavegadoresPermitidosComponent', () => {
  let component: NavegadoresPermitidosComponent;
  let fixture: ComponentFixture<NavegadoresPermitidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegadoresPermitidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegadoresPermitidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
