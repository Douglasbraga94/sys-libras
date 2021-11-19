import { ComumService } from './../../../services/comum.service';
import { Comum } from './../../../models/comum.model';
import { AdministracaoService } from './../../../services/administracao.service';
import { InterpretesService } from './../../../services/interpretes.service';
import { Interpretes } from './../../../models/interpretes.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NbToastrService } from '@nebular/theme';
import { truncate } from 'fs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Regionais } from 'src/app/models/regionais.model';
import { RegionalService } from 'src/app/services/regional.service';
import { Administracao } from 'src/app/models/administracao.model';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner/public_api';
//import { NgxSpinnerModule } from 'ngx-spinner';


@Component({
  selector: 'app-interpretes',
  templateUrl: './interpretes.component.html',
  styleUrls: ['./interpretes.component.scss']
})
export class InterpretesComponent implements OnInit {
  regional: string;
  edit: boolean;
  view: string = 'table';
  form = new FormGroup({});
  model: Interpretes;
  //model:Partial<Interpretes> = {}
  interpretes: Interpretes[];
  fields: FormlyFieldConfig[];
  regionaisSelect: Regionais[];
  administracoesSelect: Administracao[];
  comunsSelect: Comum[];


  constructor(
    private spinner:NgxSpinnerService,
    private toastService: NbToastrService,
    private interpretesService: InterpretesService,
    private regionalService: RegionalService,
    private administracaoService: AdministracaoService,
    private comumService: ComumService
  ) { }

  async ngOnInit() {
    const { data } = await this.regionalService.getAll();
    this.regionaisSelect = data;
    const dados = await this.administracaoService.getAll();
    this.administracoesSelect = dados.data;
    const dadosComum = await this.comumService.getAll();
    this.comunsSelect = dadosComum.data;
    this.regional = "Brasília";
    console.log(this.interpretesService);
    this.spinner.show();
    this.interpretesService
      .getAll(10)
      .then((dados) => {this.interpretes = dados.data; this.spinner.hide();});
    this.buildForm();
    this.view = 'table';
  }


  cancel() {
    this.view = 'table';
    this.form.reset();
  }

  buildForm() {
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-3 m-1',
            key: 'codigo',
            type: 'input',
            templateOptions: {
              label: 'Código',
              type: 'text',
              required: true
            }
          },
          {
            className: 'col-4 m-1',
            key: 'nome',
            type: 'input',
            templateOptions: {
              label: 'Nome:',
              type: 'text',
              placeholder: 'Informe um nome',
              required: true
            }
          },
          {
            className: 'col-4 m-1',
            key: 'status',
            type: 'select',
            templateOptions: {
              label: 'Status:',
              type: 'text',
              placeholder: 'Seleciona um status',
              required: true,
              options: [
                { label: 'Habilitado', value: 'habilitado' },
                { label: 'Não Habilitado', value: 'Nhabilitado' },
                { label: 'Diversos', value: 'diversos' },
              ]
            }
          },
          {
            className: 'col-11 m-1',
            key: 'statusJustificativa',
            type: 'textarea',
            templateOptions: {
              label: 'Justificativa para status Diversos',
              maxLength: 100,
              rows: 3,
              type: 'text'
            },
            expressionProperties: {
              hideExpression: 'model.status != "diversos" ',
            }
          },
          {
            className: 'col-3 m-1',
            key: 'idregional',
            type: 'select',
            templateOptions: {
              label: 'Regional:',
              type: 'text',
              placeholder: 'Selecione a regional',
              required: true,
              options: this.regionaisSelect,
              valueProp: 'id',
              labelProp: 'nome',
            }
          },
          {
            className: 'col-4 m-1',
            key: 'idadministracao',
            type: 'select',
            templateOptions: {
              label: 'Administração:',
              type: 'text',
              placeholder: 'Selecione a Administração',
              required: true,
              options: [],
              valueProp: 'id',
              labelProp: 'nome',
            },
            hooks: {
              onInit: field => {
                const teams = this.administracoesSelect;
                const regionalControal = field.form.get('idregional');
                console.log(regionalControal);
                field.templateOptions.options = regionalControal.valueChanges.pipe(
                  startWith(regionalControal.value),
                  distinctUntilChanged(),
                  map(idregional => {
                    const options = teams.filter(team => team.idregional === idregional);
                    if (!options.find(option => idregional === option.id)) {
                      field.formControl.setValue(null);
                    }
                    return options;
                  }),
                );
              },
            },
          },
          {
            className: 'col-4 m-1',
            key: 'idcomum',
            type: 'select',
            templateOptions: {
              label: 'Comum:',
              type: 'text',
              placeholder: 'Selecione a Comum',
              required: true,
              options: [],
              valueProp: 'id',
              labelProp: 'nome',
            },
            hooks: {
              onInit: field => {
                const comuns = this.comunsSelect;
                const admControl = field.form.get('idadministracao');
                console.log(admControl);
                field.templateOptions.options = admControl.valueChanges.pipe(
                  startWith(admControl.value),
                  distinctUntilChanged(),
                  map(idadministracao => {
                    const options = comuns.filter(comum => comum.idadministracao === idadministracao);
                    if (!options.find(option => idadministracao === option.id)) {
                      field.formControl.setValue(null);
                    }
                    return options;
                  }),
                );
              },
            },
          },

          {
            className: 'col-6 m-1',
            key: 'telefone1',
            type: 'input',
            templateOptions: {
              label: 'Telefone principal:',
              type: 'number',
            }
          },
          {
            className: 'col-5 m-1',
            key: 'telefone2',
            type: 'input',
            templateOptions: {
              label: 'Telefone 2:',
              type: 'number',
            }
          },
          {
            className: 'col-6 m-1',
            key: 'email',
            type: 'input',
            templateOptions: {
              label: 'E-mail',
              type: 'text',
            }
          },
          {
            className: 'col-5 m-1',
            key: 'oficializacao',
            type: 'input',
            templateOptions: {
              label: 'Data de oficialização',
              type: 'date',
              required: true
            }
          },
        ]
      },


    ]
  }

  add() {
    this.form.reset();
    this.model = new Interpretes();
    this.edit = false;
    this.view = 'form';
  }

  save() {
    if (this.model.id) {
      this.update();
      return;
    }
    if (this.form.valid) {
      this.interpretesService
        .add(this.model)
        .then((dados) => {
          if (!dados.error) {
            this.interpretes.push(dados.data[0]);
            this.view = 'table'
            this.message('Ok', 'Interprete Salvo com sucesso', 'success')
          } else {
            this.message('Érro', `Erro ao salvar. Detalhes: ${dados.error.message}`, 'danger')
          }
        })
    }
  }


  update() {
    this.interpretesService.update(this.model)
      .then(() => {
        const index = this.interpretes.findIndex((c => c.id == this.model.id));
        this.interpretes[index] = this.model;
        this.view = 'table';
        this.message('Ok', 'Intérprete Atualizado com sucesso', 'success')
      })
  }

  selecion(interpretes: Interpretes) {
    this.edit = true;
    this.view = 'form';
    this.model = interpretes;
  }


  remove(interpretes: Interpretes) {
    this.interpretesService.delete(interpretes)
      .then(() => {
        this.interpretes = this.arrayRemove(this.interpretes, interpretes.id);
        this.message('Exclusão', 'Intérprete Excluído  com sucesso', 'danger')
      })
  }

  arrayRemove(arr: Interpretes[], id: string) {
    return arr.filter((c) => c.id != id);
  }

  buscaAdministracao(idadministracao:string){
    var administracao = this.administracoesSelect.filter((item)=>{
      return item.id == idadministracao;
    })
    return administracao[0];
  }

  buscaComum(idcomum:string){
    var comum = this.comunsSelect.filter((item)=>{
      return item.id == idcomum;
    })
    return comum[0];
  }

  private message(title: string, message: string, status: string) {
    this.toastService.show(title, message,
      {
        status: status,
        duration: 3000,
      })
  }

}
