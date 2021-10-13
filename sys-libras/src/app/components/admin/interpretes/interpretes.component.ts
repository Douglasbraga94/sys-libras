import { InterpretesService } from './../../../services/interpretes.service';
import { Interpretes } from './../../../models/interpretes.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NbToastrService } from '@nebular/theme';
import { truncate } from 'fs';

@Component({
  selector: 'app-interpretes',
  templateUrl: './interpretes.component.html',
  styleUrls: ['./interpretes.component.scss']
})
export class InterpretesComponent implements OnInit {

  edit: boolean;
  view: string = 'table';
  form = new FormGroup({});
  model: Interpretes;
  interpretes: Interpretes[];
  fields:FormlyFieldConfig[];


  constructor(
    private toastService: NbToastrService,
    private interpretesService: InterpretesService
  ) { }

  ngOnInit(): void {
    this.interpretesService
    .getAll(10)
    .then((dados)=>this.interpretes = dados.data);
    this.buildForm();
    this.view = 'table';
  }

  buildForm(){
    this.fields = [
      {
        key: 'codigo',
        type: 'input',
        templateOptions:{
          label: 'Código',
          type: 'text',
          placeholder: 'Informe o Código',
          required:true
        }
      },
        {
          key: 'nome',
          type: 'input',
          templateOptions:{
            label: 'Nome',
            type: 'text',
            placeholder: 'Informe um nome',
            required:true
          }
        },
          {
            key: 'status',
            type: 'select',
            templateOptions:{
              label: 'Status',
              type: 'select',
            }
          },
          {
            key: 'email',
            type: 'input',
            templateOptions:{
              label: 'Email',
              type: 'text',
              placeholder: 'Informe o e-mail',
              required:true
            }
          },
    ]
  }

}
