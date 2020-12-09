import { CursoService } from './../../curso/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VisitaService } from './../visita.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfessorService } from 'src/app/professor/professor.service';
import { SalaAulaService } from 'src/app/sala-aula/sala-aula.service';
import { ImovelService } from 'src/app/imovel/imovel.service';

@Component({
  selector: 'app-visita-form',
  templateUrl: './visita-form.component.html',
  styleUrls: ['./visita-form.component.scss']
})
export class VisitaFormComponent implements OnInit {

  title : string = 'Nova visita'

  visita : any = {} // objeto vazio, nome da entidade no SINGULAR
  imoveis : any = []

  diasSemana : any = [
    { val: 'dom', descr: 'Domingo' },
    { val: 'seg', descr: 'Segunda-feira '},
    { val: 'ter', descr: 'Terça-feira' },
    { val: 'qua', descr: 'Quarta-feira' },
    { val: 'qui', descr: 'Quinta-feira' },
    { val: 'sex', descr: 'Sexta-feira' },
    { val: 'sáb', descr: 'Sábado'}
  ]
  
  // Variaveis para armazenar as listagens das entidades relacionadas
  visitas : any = [] // Nome no plural, vetor vazio
  

  constructor(
      private visitaSrv : VisitaService,
      private imovelSrv : ImovelService,
      private snackBar : MatSnackBar,
      private location : Location,
      private actRoute : ActivatedRoute
  ) { }

  async ngOnInit(){
    //Verificando se existe 'id' na rota que trouxe ao formulario
    if(this.actRoute.snapshot.params['id']){
      try{
        // 1) Trazer o registro do back-end para o botão editar
        this.visita = await this.visitaSrv.obterUm(this.actRoute.snapshot.params['id'])
        // 2) Mudar o título da página
        this.title = 'Editando Visita'
      }
      catch(erro){
        console.log(erro)
        this.snackBar.open('ERRO: Não foi possivel carregar os dados para edição.' ,
        'Que pena!', { duration: 5000})
      } 
    }
    //Carregar as listagens das entidades relacionadas
    try{
      this.visitas = await this.visitaSrv.listar()
      this.imoveis = await this.imovelSrv.listar()
    }
    catch(erro){
        console.log(erro)
        this.snackBar.open('ERRO: Não foi possivel carregar os dados do formulário.' ,
        'Que pena!', { duration: 5000})
    }
  }

  async salvar(form : NgForm){
    try{
      if(form.valid){
      //1) Enviar os dados para o bakc-end para serem salvos
      if(this.visita._id){
          // o _id existe, esse registro já foi salvo anteriormente
          // no BD e é caso de atualização
          await this.visitaSrv.atualizar(this.visita)
      }
      else {
          await this.visitaSrv.novo(this.visita)
      }
      
      //2) Dar um feedback (mensagem) parao usuario
      this.snackBar.open('Dados salvos com sucesso' , 'Entendi', 
      { duration: 5000})
      //3) Voltar para a tela de listagem
      this.location.back()
      }
    }
    catch(erro){    
        console.log(erro)
        this.snackBar.open('ERRO: não foi possivel salvar os dados' , 'Que pena', 
         { duration: 5000})
    }
  }

  voltar(form : NgForm){
      let result = true
    // form.dirty = formulario "sujo", não salvo (via codigo)
    // form.touched = o conteudo de algum campo foi alterado (via usuario)
    if(form.dirty && form.touched){
        result = confirm('Há dados não salvos. Deseja realmente voltar?')
    }
    //Retorna a pagina anterior se a resposta foi positiva ou se o formulario
    //estiver "limpo"
    if(result) this.location.back()
  }

}

