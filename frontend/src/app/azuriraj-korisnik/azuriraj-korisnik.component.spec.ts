import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajKorisnikComponent } from './azuriraj-korisnik.component';

describe('AzurirajKorisnikComponent', () => {
  let component: AzurirajKorisnikComponent;
  let fixture: ComponentFixture<AzurirajKorisnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajKorisnikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
