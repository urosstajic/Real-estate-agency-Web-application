import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpisakUgovorenihComponent } from './spisak-ugovorenih.component';

describe('SpisakUgovorenihComponent', () => {
  let component: SpisakUgovorenihComponent;
  let fixture: ComponentFixture<SpisakUgovorenihComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpisakUgovorenihComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpisakUgovorenihComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
