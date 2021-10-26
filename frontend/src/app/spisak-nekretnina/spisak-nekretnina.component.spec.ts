import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpisakNekretninaComponent } from './spisak-nekretnina.component';

describe('SpisakNekretninaComponent', () => {
  let component: SpisakNekretninaComponent;
  let fixture: ComponentFixture<SpisakNekretninaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpisakNekretninaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpisakNekretninaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
