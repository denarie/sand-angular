import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandDetailsComponent } from './sand-details.component';

describe('SandDetailsComponent', () => {
  let component: SandDetailsComponent;
  let fixture: ComponentFixture<SandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SandDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
