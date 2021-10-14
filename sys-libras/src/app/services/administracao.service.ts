import { DataBaseService } from './database.service';
import { Injectable } from '@angular/core';
import { Administracao } from '../models/administracao.model';

@Injectable({
  providedIn: 'root'
})
export class AdministracaoService extends DataBaseService<Administracao>{

  constructor() {
    super('administracao');
  }
}
