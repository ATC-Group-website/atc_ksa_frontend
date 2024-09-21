import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsContainerComponent } from './forms-container.component';

describe('FormsContainerComponent', () => {
  let component: FormsContainerComponent;
  let fixture: ComponentFixture<FormsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
