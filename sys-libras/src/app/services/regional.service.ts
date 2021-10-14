import { DataBaseService } from './database.service';
import { Injectable } from '@angular/core';
import { Regionais } from '../models/regionais.model';

@Injectable({
  providedIn: 'root'
})
export class RegionalService extends DataBaseService<Regionais>{

  constructor() {
    super('regional');
  }
}
