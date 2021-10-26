import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdobriRegistracijuComponent } from './odobri-registraciju.component';

describe('OdobriRegistracijuComponent', () => {
  let component: OdobriRegistracijuComponent;
  let fixture: ComponentFixture<OdobriRegistracijuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdobriRegistracijuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdobriRegistracijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
