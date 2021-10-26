import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPorukaComponent } from './nova-poruka.component';

describe('NovaPorukaComponent', () => {
  let component: NovaPorukaComponent;
  let fixture: ComponentFixture<NovaPorukaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaPorukaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaPorukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
