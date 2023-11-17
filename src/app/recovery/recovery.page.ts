import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  constructor() { }

  usuario: string = '';
  rut: string = '';
  nuevaContrasena: string = '';
  mensajeError: string = '';
  mensajeExito: string = '';

  async cambiarContrasena() {

    const usuarioGuardado = await Preferences.get({ key: 'usuario' });
    const rutGuardado = await Preferences.get({ key: 'rut' });

    // Validaciones
    const usuarioValido = this.usuario.length > 0 && this.usuario.length <= 15;
    const rutValido = /^\d{9}$/.test(this.rut);
    const nuevaContrasenaValida = /^\d{4}$/.test(this.nuevaContrasena);

    if (usuarioGuardado.value === this.usuario && rutGuardado.value === this.rut && nuevaContrasenaValida) {
      await Preferences.set({ key: 'contrasena', value: this.nuevaContrasena });
      this.mensajeError = ''; 
      this.mensajeExito = 'Contraseña cambiada exitosamente';
      
    } else {
      if (!usuarioValido) {
        this.mensajeError = 'Usuario debe tener entre 1 y 15 caracteres.';
      } else if (!rutValido) {
        this.mensajeError = 'Rut debe ser un número de 9 dígitos.';
      } else if (!nuevaContrasenaValida) {
        this.mensajeError = 'Nueva Contraseña debe ser un número de 4 dígitos.';
      } else {
        this.mensajeError = 'Usuario, Rut o Nueva Contraseña incorrectos. No se ha cambiado la contraseña.';
      }
      this.mensajeExito = ''; 
      
    }
  }

  ngOnInit() {
  }

}
