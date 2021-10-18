import { Interpretes } from './../models/interpretes.model';
import { DataBaseService } from './database.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterpretesService extends DataBaseService<Interpretes>{

  constructor() {
    super('interpretes');
  }
}
