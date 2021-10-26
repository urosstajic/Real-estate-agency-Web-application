import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArhiviraneComponent } from './arhivirane.component';

describe('ArhiviraneComponent', () => {
  let component: ArhiviraneComponent;
  let fixture: ComponentFixture<ArhiviraneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArhiviraneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArhiviraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
