import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Geolocation } from '@capacitor/geolocation';
import { ChangeDetectorRef } from '@angular/core';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {
  constructor(private alertController: AlertController,private domSanitizer:DomSanitizer,private route: ActivatedRoute,private cdr: ChangeDetectorRef) {}

  datos: string = '';
  nombreProfesor: string = '';
  hora: string = '';
  sala: string = '';
  dia: string = '';
  timestamp: string = '';
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  regionSeleccionada: string = '';
  latitude: number=0;
  longitude: number=0;
  imageSource:any;

  extraerInformacion() {
    const nombreProfesorMatch = this.datos.match(/Nombre Profesor: ([^,]+)/);
    const horaMatch = this.datos.match(/Hora: ([^,]+)/);
    const salaMatch = this.datos.match(/sala: ([^,]+)/);
    const diaMatch = this.datos.match(/Dia: ([^,]+)/);

    this.nombreProfesor = nombreProfesorMatch ? nombreProfesorMatch[1] : '';
    this.hora = horaMatch ? horaMatch[1] : '';
    this.sala = salaMatch ? salaMatch[1] : '';
    this.dia = diaMatch ? diaMatch[1] : '';

   
    this.obtenerNombreYRutDesdePreferencias();
  }

  async obtenerNombreYRutDesdePreferencias() {
    try {
     
      const nombreGuardado = await Preferences.get({ key: 'nombre' });
      const rutGuardado = await Preferences.get({ key: 'rut' });
      const apellidoGuardado = await Preferences.get({key: 'apellido'})
      const regionGuardada = await Preferences.get({ key: 'region' });

      this.nombre = nombreGuardado.value || ''; 
      this.rut = rutGuardado.value || ''; 
      this.apellido = apellidoGuardado.value || '';
      this.regionSeleccionada = regionGuardada.value || '';
    } catch (error) {
      console.error('Error al obtener datos desde las preferencias:', error);
    }
  }

  ngOnInit() {
    
    this.route.queryParams.subscribe((params) => {
      this.regionSeleccionada = params['region'];
    });//fin route

    const currentDate = new Date();

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };//fin options

    this.timestamp = currentDate.toLocaleDateString('es-ES', options);

    this.route.queryParams.subscribe((params) => {
      const string = params['result'];
     
      if (string) {
        this.datos = string;
        console.log(this.datos);
        this.extraerInformacion();
      }
    });
  }//fin ngOnInit

  ionViewDidEnter() {
    this.printCurrentPosition();
  }//fin ionViewDidEnter

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    this.latitude = Number(coordinates.coords.latitude.toFixed(2));
    this.longitude = Number(coordinates.coords.longitude.toFixed(2));
    this.cdr.detectChanges();
    console.log('Latitude:', this.latitude);
    console.log('Longitude:', this.longitude);
  };//fin printCurrentPosition

  
    takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source:CameraSource.Prompt
    });
    this.imageSource= this.domSanitizer.bypassSecurityTrustUrl(image.webPath ? image.webPath : "")
  };//fin takePicture


  obtenerFoto(){
    return this.imageSource
  }//fin obtenerFoto


}

