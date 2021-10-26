import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajNekretninnuComponent } from './dodaj-nekretninnu.component';

describe('DodajNekretninnuComponent', () => {
  let component: DodajNekretninnuComponent;
  let fixture: ComponentFixture<DodajNekretninnuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajNekretninnuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajNekretninnuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
