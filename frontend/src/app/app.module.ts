import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule, MatMenuItem} from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { RadnikComponent } from './radnik/radnik.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PromeniLozinkuComponent } from './promeni-lozinku/promeni-lozinku.component';
import { NekretninaComponent } from './nekretnina/nekretnina.component';
import { KonverzacijaComponent } from './konverzacija/konverzacija.component';
import { InboxComponent } from './inbox/inbox.component';
import { AzurirajPodComponent } from './azuriraj-pod/azuriraj-pod.component';
import { MojeNekretnineComponent } from './moje-nekretnine/moje-nekretnine.component';
import { DodajNekretninnuComponent } from './dodaj-nekretninnu/dodaj-nekretninnu.component';
import { OdobriNekretninuComponent } from './odobri-nekretninu/odobri-nekretninu.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { SpisakNekretninaComponent } from './spisak-nekretnina/spisak-nekretnina.component';
import { DodajKorisnikaComponent } from './dodaj-korisnika/dodaj-korisnika.component';
import { SviKorisniciComponent } from './svi-korisnici/svi-korisnici.component';
import { NovaPorukaComponent } from './nova-poruka/nova-poruka.component';
import { ArhiviraneComponent } from './arhivirane/arhivirane.component';
import { ChartsModule } from 'ng2-charts';
import { AzurirajKorisnikComponent } from './azuriraj-korisnik/azuriraj-korisnik.component';
import { OdobriRegistracijuComponent } from './odobri-registraciju/odobri-registraciju.component';
import { YourGuardGuard } from './your-guard.guard';
import { Guard2Guard } from './guard2.guard';
import { SpisakUgovorenihComponent } from './spisak-ugovorenih/spisak-ugovorenih.component';

 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    RadnikComponent,
    RegistracijaComponent,
    PromeniLozinkuComponent,
    NekretninaComponent,
    KonverzacijaComponent,
    InboxComponent,
    AzurirajPodComponent,
    MojeNekretnineComponent,
    DodajNekretninnuComponent,
    OdobriNekretninuComponent,
    PocetnaComponent,
    SpisakNekretninaComponent,
    DodajKorisnikaComponent,
    SviKorisniciComponent,
    NovaPorukaComponent,
    ArhiviraneComponent,
    AzurirajKorisnikComponent,
    OdobriRegistracijuComponent,
    SpisakUgovorenihComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
