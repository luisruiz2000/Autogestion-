import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedireccionAppComponent } from './redireccion-app.component';

describe('RedireccionAppComponent', () => {
  let component: RedireccionAppComponent;
  let fixture: ComponentFixture<RedireccionAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedireccionAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedireccionAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
