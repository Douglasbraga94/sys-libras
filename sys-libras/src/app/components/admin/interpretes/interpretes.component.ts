import { InterpretesService } from './../../../services/interpretes.service';
import { Interpretes } from './../../../models/interpretes.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NbToastrService } from '@nebular/theme';
import { truncate } from 'fs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-interpretes',
  templateUrl: './interpretes.component.html',
  styleUrls: ['./interpretes.component.scss']
})
export class InterpretesComponent implements OnInit {
  regional:string;
  edit: boolean;
  view: string = 'table';
  form = new FormGroup({});
  model: Interpretes;
  interpretes: Interpretes[];
  fields: FormlyFieldConfig[];


  constructor(
    private toastService: NbToastrService,
    private interpretesService: InterpretesService
  ) { }

  ngOnInit(): void {
    this.regional = "Brasília";
    console.log(this.interpretesService);
    this.interpretesService
    .getAll(10)
    .then((dados)=> this.interpretes = dados.data);
    this.buildForm();
    this.view = 'table';
  }


  cancel(){
    this.view = 'table';
    this.form.reset();
  }

  buildForm(){
    this.fields = [
      {
        key: 'nome',
        type: 'input',
        templateOptions:{
          label:'Nome:',
          type: 'text',
          placeholder: 'Informe um nome',
          required: true
        }
      },
      {
        key: 'email',
        type: 'input',
        templateOptions:{
          label:'E-mail:',
          placeholder: 'Informe o E-mail',
        }
      },
    ]
  }

  add(){
    this.form.reset();
    this.model = new Interpretes();
    this.edit = false;
    this.view = 'form';
  }

  save(){
    if(this.model.id){
      this.update();
      return;
    }
    if(this.form.valid){
      this.interpretesService
      .add(this.model)
      .then((dados)=>{
        if(!dados.error){
          this.interpretes.push(dados.data[0]);
          this.view = 'table'
          this.message('Ok', 'Interprete Salvo com sucesso', 'success')
        }else{
          this.message('Érro', `Erro ao salvar. Detalhes: ${dados.error.message}`, 'danger')
        }
      })
    }
  }


  update(){
    this.interpretesService.update(this.model)
    .then(()=>{
      const index = this.interpretes.findIndex((c => c.id == this.model.id));
      this.interpretes[index] = this.model;
      this.view = 'table';
      this.message('Ok', 'Intérprete Atualizado com sucesso', 'success')
    })
  }

  selecion(interpretes: Interpretes){
    this.edit = true;
    this.view = 'form';
    this.model = interpretes;
  }


  remove(interpretes: Interpretes){
    this.interpretesService.delete(interpretes)
    .then(()=>{
      this.interpretes = this.arrayRemove(this.interpretes, interpretes.id);
      this.message('Exclusão', 'Intérprete Excluído  com sucesso', 'danger')
    })
  }

  arrayRemove(arr:Interpretes[], id:string){
    return arr.filter((c)=> c.id != id);
  }


  private message(title:string, message:string, status:string){
    this.toastService.show(title, message,
      {
        status: status,
        duration: 3000,
      })
  }

}
