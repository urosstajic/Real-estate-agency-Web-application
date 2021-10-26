import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajPodComponent } from './azuriraj-pod.component';

describe('AzurirajPodComponent', () => {
  let component: AzurirajPodComponent;
  let fixture: ComponentFixture<AzurirajPodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajPodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajPodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
