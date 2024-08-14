import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProTrainingComponent } from './pro-training.component';

describe('ProTrainingComponent', () => {
  let component: ProTrainingComponent;
  let fixture: ComponentFixture<ProTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProTrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
