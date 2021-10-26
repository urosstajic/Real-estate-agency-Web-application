import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretina } from '../models/nekretnina';
import { Poruka } from '../models/poruka';
import { User } from '../models/user';
import { NekretninaService } from '../nekretnina.service';
import { PorukaService } from '../poruka.service';
import {ChartsModule} from "ng2-charts";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';



@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {

  constructor(private nekretninaService:NekretninaService,  private router:Router) { }

  ngOnInit(): void {
    this.pomNekretnine=0;
    this.pomPodesavanja=0;
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
        //this.nekretnine=nekr;
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
          if(n[i].odobreno==1){
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
       console.log(this.brStanProdaja)

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

  pocetna(){
    this.router.navigate(["radnik"]);
  }

  prikaziInbox(){
    this.router.navigate(["inbox"]);
  }

  prikaziMojeN(){
    this.router.navigate(["moje-nekretnine"]);
  }

  pomPodesavanja:number;
  prikaziPodesavanja:number;
  pomNekretnine:number;
  prikaziNekretnine:number;
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

  promLoz(){
    this.router.navigate(["promeniLozinku"]);
  }

  zaOdobri(){
this.router.navigate(["odobri-nekretninu"]);
  }
  

  nekretnine:Nekretina[];
  inbox:Poruka[];
  zaPrikazInbox:Set<String>;
  user:User;



  prikaziFormuZaAzuriranje(){
    this.router.navigate(["azuriraj-pod"]);
  }



  prikazDodaj(){
    this.router.navigate(["dodaj-nekretninnu"]);
  }
  
  ugovorene(){
    this.router.navigate(['spisak-ugovorenih']);
  }



  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  prikazSveNekr(){
    this.router.navigate(["spisak-nekretnina"]);
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

}
