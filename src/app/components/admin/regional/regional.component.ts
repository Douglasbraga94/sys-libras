import { NgxSpinnerService } from 'ngx-spinner';
import { Comum } from './../../../models/comum.model';
import { Administracao } from './../../../models/administracao.model';
import { ComumService } from './../../../services/comum.service';
import { AdministracaoService } from './../../../services/administracao.service';
import { Regionais } from './../../../models/regionais.model';
import { RegionalService } from './../../../services/regional.service';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.scss']
})
export class RegionalComponent implements OnInit {

  edit: boolean;
  view: string = 'inicio';
  form = new FormGroup({});
  formAdm = new FormGroup({});
  formComum = new FormGroup({});
  model: Regionais;
  modelAdm: Administracao;
  modelComum: Comum;
  regionais: Regionais[];
  regionaisSelect: Regionais[];
  administracoes: Administracao[];
  administracoesSelect: Administracao[];
  comuns: Comum[];
  fields: FormlyFieldConfig[];
  fieldsAdm: FormlyFieldConfig[];
  fieldsComum: FormlyFieldConfig[];


  constructor(
    private spinner:NgxSpinnerService,
    private toastService: NbToastrService,
    private regionalService: RegionalService,
    private administracaoService: AdministracaoService,
    private comumService: ComumService
  ) { }

  async ngOnInit(){
    this.spinner.show();
    const {data} = await this.regionalService.getAll();
    this.regionaisSelect = data;
    const dados = await this.administracaoService.getAll();
    this.administracoesSelect = dados.data;
    this.regionalService
    .getAll(10)
    .then((dados)=> this.regionais = dados.data);
    this.administracaoService
    .getAll(10)
    .then((dados)=> this.administracoes = dados.data);    
    this.comumService
    .getAll(10)
    .then((dados)=> {this.comuns = dados.data; this.spinner.hide();}); 
    this.buildForm();
    this.buildFormAdm();
    this.buildFormComum();
    this.view = 'inicio';
  }


  cancel(){
    if(this.view == 'formRegional') {
      this.view = 'tableRegional'; 
      this.form.reset();
    }
    else if(this.view == 'formAdm') {
      this.view = 'tableAdm'; 
      this.formAdm.reset();
    }
    else if(this.view == 'formComum') {
      this.view = 'tableComum'; 
      this.formAdm.reset();
    }
  }

  buildForm(){
    this.fields = [
      {
        key: 'nome',
        type: 'input',
        templateOptions:{
          label:'Nome da Regional:',
          type: 'text',
          placeholder: 'Informe um nome',
          required: true
        }
      },

    ]
  }

  buildFormAdm(){
    this.fieldsAdm = [
      {
        key: 'idregional',
        type: 'select',
        templateOptions:{
          label:'Regional:',
          type: 'text',
          placeholder: 'Selecione a Regional',
          required: true,
          options: this.regionaisSelect.map((regional)=>({
            label: regional.nome,
            value: regional.id
          }))
        }
      },
      {
        key: 'nome',
        type: 'input',
        templateOptions:{
          label:'Nome da Administração:',
          type: 'text',
          placeholder: 'Informe um nome',
          required: true
        }
      },

    ]
  }

  buildFormComum(){
    this.fieldsComum = [
      {
        key: 'idadministracao',
        type: 'select',
        templateOptions:{
          label:'Administração:',
          type: 'text',
          placeholder: 'Selecione a Administração',
          required: true,
          options: this.administracoesSelect.map((adm)=>({
            label: adm.nome,
            value: adm.id
          }))
        }
      },
      {
        key: 'nome',
        type: 'input',
        templateOptions:{
          label:'Nome da Comum:',
          type: 'text',
          placeholder: 'Informe o nome da Comum',
          required: true
        }
      },

    ]
  }


  addRegional(){
    this.form.reset();
    this.model = new Regionais();
    this.edit = false;
    this.view = 'formRegional';
  }

  addAdministracao(){
    this.formAdm.reset();
    this.modelAdm = new Administracao();
    this.edit = false;
    this.view = 'formAdm';
  } 

  addComum(){
    this.formComum.reset();
    this.modelComum = new Comum();
    this.edit = false;
    this.view = 'formComum';
  } 

  saveRegional(){
    if(this.model.id){
      this.updateRegional();
      return;
    }
    if(this.form.valid){
      this.regionalService
      .add(this.model)
      .then((dados)=>{
        if(!dados.error){
          this.regionais.push(dados.data[0]);
          this.view = 'tableRegional'
          this.message('Ok', 'Regional Salva com sucesso', 'success')
        }else{
          this.message('Érro', `Erro ao salvar. Detalhes: ${dados.error.message}`, 'danger')
        }
      })
    }
  }


  saveAdm(){
    if(this.modelAdm.id){
      this.updateAdm();
      return;
    }
    if(this.formAdm.valid){
      this.administracaoService
      .add(this.modelAdm)
      .then((dados)=>{
        if(!dados.error){
          this.administracoes.push(dados.data[0]);
          this.view = 'tableAdm'
          this.message('Ok', 'Administração Salva com sucesso', 'success')
        }else{
          this.message('Érro', `Erro ao salvar. Detalhes: ${dados.error.message}`, 'danger')
        }
      })
    }
  }  

  saveComum(){
    if(this.modelComum.id){
      this.updateComum();
      return;
    }
    if(this.formComum.valid){
      this.comumService
      .add(this.modelComum)
      .then((dados)=>{
        if(!dados.error){
          this.comuns.push(dados.data[0]);
          this.view = 'tableComum'
          this.message('Ok', 'Comum Salva com sucesso', 'success')
        }else{
          this.message('Érro', `Erro ao salvar. Detalhes: ${dados.error.message}`, 'danger')
        }
      })
    }
  }  

  updateRegional(){
    this.regionalService.update(this.model)
    .then(()=>{
      const index = this.regionais.findIndex((c => c.id == this.model.id));
      this.regionais[index] = this.model;
      this.view = 'tableRegional';
      this.message('Ok', 'Regional Atualizada com sucesso', 'success')
    })
  }

  updateAdm(){
    this.administracaoService.update(this.modelAdm)
    .then(()=>{
      const index = this.administracoes.findIndex((c => c.id == this.modelAdm.id));
      this.administracoes[index] = this.modelAdm;
      this.view = 'tableAdm';
      this.message('Ok', 'Administração Atualizada com sucesso', 'success')
    })
  }

  updateComum(){
    this.comumService.update(this.modelComum)
    .then(()=>{
      const index = this.comuns.findIndex((c => c.id == this.modelComum.id));
      this.comuns[index] = this.modelComum;
      this.view = 'tableComum';
      this.message('Ok', 'Comum Atualizada com sucesso', 'success')
    })
  }


  selecion(regional: Regionais){
    this.edit = true;
    this.view = 'formRegional';
    this.model = regional;
  }

  selecionAdm(adm: Administracao){
    this.edit = true;
    this.view = 'formAdm';
    this.modelAdm = adm;
  }


  selecionComum(comum: Comum){
    this.edit = true;
    this.view = 'formAdm';
    this.modelComum = comum;
  }  

  remove(regional: Regionais){
    this.regionalService.delete(regional)
    .then(()=>{
      this.regionais = this.arrayRemove(this.regionais, regional.id);
      this.message('Exclusão', 'Regional Excluída com sucesso', 'danger')
    })
  }

  removeAdm(adm: Administracao){
    this.administracaoService.delete(adm)
    .then(()=>{
      this.administracoes = this.arrayRemoveAdm(this.administracoes, adm.id);
      this.message('Exclusão', 'Administração  Excluída  com sucesso', 'danger')
    })
  }

  removeComum(comum: Comum){
    this.comumService.delete(comum)
    .then(()=>{
      this.comuns = this.arrayRemoveComum(this.comuns, comum.id);
      this.message('Exclusão', 'Comum  Excluída  com sucesso', 'danger')
    })
  }


  arrayRemove(arr:Regionais[], id:string){
    return arr.filter((c)=> c.id != id);
  }

  arrayRemoveAdm(arr:Administracao[], id:string){
    return arr.filter((c)=> c.id != id);
  }  

  arrayRemoveComum(arr:Comum[], id:string){
    return arr.filter((c)=> c.id != id);
  }  


  goToRegional(){
    this.view = 'tableRegional';
    return
  }

  goToAdm(){
    this.view = 'tableAdm';
    return
  }

  goToComum(){
    this.view = 'tableComum';
    return
  }

  backButton(){
    this.view = 'inicio';
    return
  }

  buscaRegional(idregional:string){
    var regional = this.regionaisSelect.filter((item)=>{
      return item.id == idregional;
    })
    return regional[0];
  }

  buscaAdministracao(idadministracao:string){
    var administracao = this.administracoesSelect.filter((item)=>{
      return item.id == idadministracao;
    })
    return administracao[0];
  }


  private message(title:string, message:string, status:string){
    this.toastService.show(title, message,
      {
        status: status,
        duration: 3000,
      })
  }
}
