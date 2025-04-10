import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandListComponent } from './sand-list.component';

describe('SandListComponent', () => {
  let component: SandListComponent;
  let fixture: ComponentFixture<SandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SandListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
