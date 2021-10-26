import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { RegistracijaService } from '../registracija.service';
import { UserService } from '../user.service';
import alertify from "alertify.js";
import { Router } from '@angular/router';
import { Nekretina } from '../models/nekretnina';
import { NekretninaService } from '../nekretnina.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService:UserService, private regService:RegistracijaService, private router:Router, private nekretninaService:NekretninaService) { }

  ngOnInit(): void {
    this.prikaziNekretnine=0;
    this.prikaziPodesavanja=0;
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
    this.prikaziKorisnik=0;
    this.pomKorisnik=0;
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    
    this.zaCenovniRangProdaja=[];
    this.imenaGradova=[];
    this.brKucaIzdavanje=0;
    this.brStanProdaja=0;
    this.brKucaProdaja=0;
    this.brStanIzdavanje=0;
    this.nekretnine=[];
    for(var i=0;i<11;i++){
      this.zaCenovniRangProdaja[i]=0;
    }
    this.user=JSON.parse(localStorage.getItem("ulogovan"));
    this.nekretninaService.dohvatiSve().subscribe((nekr:Nekretina[])=>{
      if(nekr){
        for(var i in nekr){
          if(nekr[i].odobreno==1){
            this.nekretnine.push(nekr[i]);
          }
        }
       // this.nekretnine=nekr;
        console.log(this.nekretnine);

        for(var i in this.nekretnine){
          //za cenovni rang
          if(this.nekretnine[i].cena<=10000){
            this.zaCenovniRangProdaja[0]++;
          }if(this.nekretnine[i].cena>10000 && this.nekretnine[i].cena<=20000){
            this.zaCenovniRangProdaja[1]++;
          }
          if(this.nekretnine[i].cena<=30000 && this.nekretnine[i].cena>20000){
            this.zaCenovniRangProdaja[2]++;
          }
          if(this.nekretnine[i].cena>30000 && this.nekretnine[i].cena<=30000){
            this.zaCenovniRangProdaja[3]++;
          }
          if(this.nekretnine[i].cena<=50000 && this.nekretnine[i].cena>40000){
            this.zaCenovniRangProdaja[4]++;
          }
          if(this.nekretnine[i].cena<=60000 && this.nekretnine[i].cena>50000){
            this.zaCenovniRangProdaja[5]++;
          }
          if(this.nekretnine[i].cena<=70000 && this.nekretnine[i].cena>60000){
            this.zaCenovniRangProdaja[6]++;
          }
          if(this.nekretnine[i].cena<=80000 && this.nekretnine[i].cena>70000){
            this.zaCenovniRangProdaja[7]++;
          }
          if(this.nekretnine[i].cena<=90000 && this.nekretnine[i].cena>80000){
            this.zaCenovniRangProdaja[8]++;
          }
          if(this.nekretnine[i].cena<=100000 && this.nekretnine[i].cena>90000){
            this.zaCenovniRangProdaja[9]++;
          }
          if(this.nekretnine[i].cena>100000){
            this.zaCenovniRangProdaja[10]++;
          }
        }
        this.barChart1Data=[
          { data: this.zaCenovniRangProdaja , label: 'Cenovni rang nekretnina za prodaju', hoverBackgroundColor:'rgb(47,79,79)', backgroundColor:"rgb(128,128,128)" }
        ]
        this.chart1Ready=true;
      }
    });
    this.nekretninaService.dohvatiSve().subscribe((n:Nekretina[])=>{
      if(n){
        this.brNekrPoGradu=[];
        var gr:string[];
          for(var i in n){
            if(n[i]){
            gr=n[i].adresa.split(', ');
            if(this.imenaGradova.length==0){
              this.imenaGradova.push(gr[0])
            }else{
              var ubaci:number;
                ubaci=0;
              for(var j in this.imenaGradova){
                if(this.imenaGradova[j]==gr[0]){
                  ubaci=1;
                }
              }
              if(ubaci!=1){
                this.imenaGradova.push(gr[0]);
              }
            }
          }
        }
        
        
        for(var i in this.imenaGradova){
          this.brNekrPoGradu[i]=0;
        }
      
        this.barChart2Labels=this.imenaGradova;
        for(var i in this.imenaGradova){
          for(var j in n){
            if(n[j].odobreno==1){
              gr=n[j].adresa.split(', ');
              if(gr[0]==this.imenaGradova[i]){
                this.brNekrPoGradu[i]++;
              }
            }
            
          }
        }

        this.barChart2Data=[
          {data:this.brNekrPoGradu, label:"Broj nekretnina po gradovima", hoverBackgroundColor:'rgb(47,79,79)', backgroundColor:"rgb(128,128,128)"}
        ]
        this.chart2Ready=true;
      }
    })
   this.nekretninaService.dohvatiSve().subscribe((n:Nekretina[])=>{
     if(n){
       for(var i in n){
         if(n[i].odobreno==1){
          if(n[i].tip=='kuca' && n[i].izdavanje_prodaja=='izdavanje'){
            this.brKucaIzdavanje++;
           }
           if(n[i].tip=='kuca' && n[i].izdavanje_prodaja=='prodaja'){
            this.brKucaProdaja++;
           }
           if(n[i].tip=='stan' && n[i].izdavanje_prodaja=='izdavanje'){
            this.brStanIzdavanje++;
           }
           if(n[i].tip=='stan' && n[i].izdavanje_prodaja=='prodaja'){
            this.brStanProdaja++;
           }
         }
         
       }

       this.barChart3Data=[
         {
           data:[this.brStanIzdavanje, this.brStanProdaja], label:"Broj stanova", hoverBackgroundColor:'rgb(47,79,79)', backgroundColor:"rgb(128,128,128)"
         }
       ]

       this.barChart4Data=[
        {
          data:[this.brKucaIzdavanje, this.brKucaProdaja], label:"Broj kuca", hoverBackgroundColor:'rgb(47,79,79)', backgroundColor:"rgb(128,128,128)"
        }
      ]

      this.chart3Ready=true;
      this.chart4Ready=true;
     }
   })

  }

  user:User;
  nekretnine:Nekretina[];

  zaCenovniRangProdaja:number[];
  chart1Ready:boolean;
  chart2Ready:boolean;
  chart3Ready:boolean;
  chart4Ready:boolean;
  imenaGradova:string[];
  brNekrPoGradu:number[];
  brKucaIzdavanje:number;
  brKucaProdaja:number;
  brStanIzdavanje:number;
  brStanProdaja:number;




  pocetna(){
    if(this.user.tip=="admin"){
      this.router.navigate(["admin"]);
    }else{
      if(this.user.tip=="radnik"){
        this.router.navigate(["radnik"]);
      }else{
        this.router.navigate(["user"]);
      }
    }
    
  }

  prikaziFormuZaAzuriranje(){
    this.router.navigate(["azuriraj-pod"]);
  }

  pomPodesavanja:number;
  prikaziPodesavanja:number;
  pomNekretnine:number;
  prikaziNekretnine:number;
  pomKorisnik:number;
  prikaziKorisnik:number;

  povecajPodesavanja(){
this.pomPodesavanja++;
if(this.pomPodesavanja%2){
this.prikaziPodesavanja=1;
}else{
  this.prikaziPodesavanja=0;
}
  }

  povecajNekr(){
    this.pomNekretnine++;
    if(this.pomNekretnine%2){
      this.prikaziNekretnine=1;
    }else{
      this.prikaziNekretnine=0;
    }
  }

  povecajKorisnik(){
    this.pomKorisnik++;
    if(this.pomKorisnik%2){
      this.prikaziKorisnik=1;
    }else{
      this.prikaziKorisnik=0;
    }
  }

  promLoz(){
    this.router.navigate(["promeniLozinku"]);
  }

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  dodaj(){
    this.router.navigate(["dodaj-korisnika"]);
  }

  izmeni(){
    this.router.navigate(["svi-korisnici"]);
  }

  zaOdobri(){
    this.router.navigate(["odobri-nekretninu"]);
  }

   prikazDodaj(){
       this.router.navigate(["dodaj-nekretninnu"]);
  }

  odobriKorisnik(){
    this.router.navigate(["odobri-registraciju"]);
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };
  barChart1Labels: Label[] = ['<10000','10000-20000','20000-30000', '30000-40000', '40000-50000', '50000-60000', '60000-70000', '70000-80000', '80000-90000', '90000-100000', '100000+'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChart1Data: ChartDataSets[];
  barChart2Data:ChartDataSets[];
  barChart2Labels:Label[];
  barChart3Labels:Label[]=['Broj stanova za izdavanje', 'Broj stanova za prodaju']
  barChart3Data:ChartDataSets[];
  barChart4Labels:Label[]=['Broj kuca za izdavanje', 'Broj kuca za prodaju']
  barChart4Data:ChartDataSets[];
  

  ugovorene(){
    this.router.navigate(['spisak-ugovorenih']);
  }
}
