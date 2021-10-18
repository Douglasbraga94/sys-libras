import { Comum } from './../models/comum.model';
import { DataBaseService } from './database.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComumService extends DataBaseService<Comum>{

  constructor() {
    super('comum');
  }
}
