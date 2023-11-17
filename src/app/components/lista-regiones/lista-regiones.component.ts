import { Component, OnInit } from '@angular/core';

import { RegionesService } from 'src/app/services/regiones.service';

@Component({
  selector: 'app-regiones',
  templateUrl: './lista-regiones.component.html',
  styleUrls: ['./lista-regiones.component.scss'],
})
export class RegionesComponent  implements OnInit {

  regiones: any[] = [];
  regionSeleccionada: any;

  constructor(private regionesService: RegionesService) { }

  ngOnInit() {
 
  }

}