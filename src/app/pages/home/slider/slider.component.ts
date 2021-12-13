import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  peliculas:any[]=[
    {name:'Diabetes 1',
    img:'assets/comida.jpg',
    desc:'La diabetes eleva su azúcar en la sangre a un nivel más alto de lo normal. Después de muchos años, mucha azúcar en la sangre puede causar problemas en su cuerpo. Puede dañar sus ojos, riñones, nervios, piel, corazón y vasos sanguíneos.'},
    {name:'Diabetes 2',
    img:'assets/diabetes2.jpg',
    desc:'Usted puede necesitar revisar su azúcar en la sangre diariamente o con más frecuencia. Su proveedor de atención médica también lo ayudará solicitando exámenes de sangre y otras pruebas. Todo esto le puede ayudar a mantener lejos las complicaciones de la diabetes.'},
  
  ];


  constructor(private _config:NgbCarouselConfig, private router:Router) {
    _config.interval = 3000;
    _config.pauseOnHover = false;
    _config.showNavigationArrows = true;

   }

  ngOnInit(): void {
  }
  
  public goToIniciarSesion(){
    this.router.navigate(['/iniciarSesion'])
  }
}
