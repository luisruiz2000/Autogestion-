import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginlookfeelComponent } from './loginlookfeel.component';

describe('LoginlookfeelComponent', () => {
  let component: LoginlookfeelComponent;
  let fixture: ComponentFixture<LoginlookfeelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginlookfeelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginlookfeelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
