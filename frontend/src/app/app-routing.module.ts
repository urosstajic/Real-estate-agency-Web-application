import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ArhiviraneComponent } from './arhivirane/arhivirane.component';
import { AzurirajKorisnikComponent } from './azuriraj-korisnik/azuriraj-korisnik.component';
import { AzurirajPodComponent } from './azuriraj-pod/azuriraj-pod.component';
import { DodajKorisnikaComponent } from './dodaj-korisnika/dodaj-korisnika.component';
import { DodajNekretninnuComponent } from './dodaj-nekretninnu/dodaj-nekretninnu.component';
import { Guard2Guard } from './guard2.guard';
import { Guard3Guard } from './guard3.guard';
import { InboxGuardGuard } from './inbox-guard.guard';
import { InboxComponent } from './inbox/inbox.component';
import { KonverzacijaGuard } from './konverzacija.guard';
import { KonverzacijaComponent } from './konverzacija/konverzacija.component';
import { LoginComponent } from './login/login.component';
import { MojeNekretnineComponent } from './moje-nekretnine/moje-nekretnine.component';
import { NekretninaGuard } from './nekretnina.guard';
import { NekretninaComponent } from './nekretnina/nekretnina.component';
import { OdobriNGuard } from './odobri-n.guard';
import { OdobriNekretninuComponent } from './odobri-nekretninu/odobri-nekretninu.component';
import { OdobriRegistracijuComponent } from './odobri-registraciju/odobri-registraciju.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PocetniGuardGuard } from './pocetni-guard.guard';
import { PromeniLozinkuComponent } from './promeni-lozinku/promeni-lozinku.component';
import { RadnikComponent } from './radnik/radnik.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { SpisakNekretninaComponent } from './spisak-nekretnina/spisak-nekretnina.component';
import { SpisakUgovorenihComponent } from './spisak-ugovorenih/spisak-ugovorenih.component';
import { SviKorisniciComponent } from './svi-korisnici/svi-korisnici.component';
import { UserComponent } from './user/user.component';
import { YourGuardGuard } from './your-guard.guard';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"admin", component:AdminComponent, canActivate:[YourGuardGuard]},
  {path:"user", component:UserComponent, canActivate:[Guard2Guard]},
  {path:"radnik", component:RadnikComponent, canActivate:[Guard3Guard]},
  {path:"registracija", component:RegistracijaComponent},
  {path:"promeniLozinku", component:PromeniLozinkuComponent, canActivate:[PocetniGuardGuard]},
  {path:"nekretnina", component:NekretninaComponent, canActivate:[NekretninaGuard]},
  {path:"konverzacija", component:KonverzacijaComponent, canActivate:[KonverzacijaGuard]},
  {path:"inbox", component:InboxComponent, canActivate:[InboxGuardGuard]},
  {path:"azuriraj-pod", component:AzurirajPodComponent, canActivate:[PocetniGuardGuard]},
  {path:"dodaj-nekretninnu", component:DodajNekretninnuComponent, canActivate:[PocetniGuardGuard]},
  {path:"moje-nekretnine", component:MojeNekretnineComponent, canActivate:[InboxGuardGuard]},
  {path:"odobri-nekretninu", component:OdobriNekretninuComponent, canActivate:[OdobriNGuard]},
  {path:"pocetna", component:PocetnaComponent},
  {path:"spisak-nekretnina", component:SpisakNekretninaComponent, canActivate:[Guard3Guard]},
  {path:"dodaj-korisnika", component:DodajKorisnikaComponent, canActivate:[YourGuardGuard]},
  {path:"svi-korisnici", component:SviKorisniciComponent, canActivate:[YourGuardGuard]},
  {path:'azuriraj-korisnik', component:AzurirajKorisnikComponent, canActivate:[YourGuardGuard]},
  {path:"odobri-registraciju", component:OdobriRegistracijuComponent, canActivate:[YourGuardGuard]},
  {path:"arhivirane", component:ArhiviraneComponent, canActivate:[InboxGuardGuard]},
  {path:"spisak-ugovorenih", component:SpisakUgovorenihComponent, canActivate:[OdobriNGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
