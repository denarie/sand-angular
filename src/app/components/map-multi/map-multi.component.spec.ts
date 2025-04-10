import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMultiComponent } from './map-multi.component';

describe('MapMultiComponent', () => {
  let component: MapMultiComponent;
  let fixture: ComponentFixture<MapMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapMultiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
