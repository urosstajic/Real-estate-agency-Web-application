import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdobriNekretninuComponent } from './odobri-nekretninu.component';

describe('OdobriNekretninuComponent', () => {
  let component: OdobriNekretninuComponent;
  let fixture: ComponentFixture<OdobriNekretninuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdobriNekretninuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdobriNekretninuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
