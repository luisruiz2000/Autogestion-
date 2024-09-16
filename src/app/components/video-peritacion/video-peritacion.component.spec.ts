import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPeritacionComponent } from './video-peritacion.component';

describe('VideoPeritacionComponent', () => {
  let component: VideoPeritacionComponent;
  let fixture: ComponentFixture<VideoPeritacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPeritacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPeritacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
