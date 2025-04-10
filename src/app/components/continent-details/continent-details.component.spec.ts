import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinentDetailsComponent } from './continent-details.component';

describe('ContinentDetailsComponent', () => {
  let component: ContinentDetailsComponent;
  let fixture: ComponentFixture<ContinentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
