import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private regionSeleccionadaSource = new BehaviorSubject<string>('');
  regionSeleccionada$ = this.regionSeleccionadaSource.asObservable();

  setRegionSeleccionada(region: string) {
    this.regionSeleccionadaSource.next(region);
  }
}
