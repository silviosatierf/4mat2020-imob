import { ComplementoService } from './../../complemento/complemento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImovelService } from './../imovel.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IdentificacaoService } from 'src/app/identificacao/identificacao.service';
import { CorretorService } from 'src/app/corretor/corretor.service';

@Component({
  selector: 'app-imovel-form',
  templateUrl: './imovel-form.component.html',
  styleUrls: ['./imovel-form.component.scss']
})
export class ImovelFormComponent implements OnInit {

  title : string = 'Novo imovel'

  imovel : any = {} // objeto vazio, nome da entidade no SINGULAR

  // Variaveis para armazenar as listagens das entidades relacionadas
  complementos : any = [] // Nome no plural, vetor vazio
  identificacoes : any = []
  corretores : any = []

  constructor(
      private complementoSrv : ComplementoService,
      private identificacaoSrv : IdentificacaoService,
      private corretorSrv : CorretorService,
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
        this.imovel = await this.imovelSrv.obterUm(this.actRoute.snapshot.params['id'])
        // 2) Mudar o título da página
        this.title = 'Editando Imovel'
      }
      catch(erro){
        console.log(erro)
        this.snackBar.open('ERRO: Não foi possivel carregar os dados para edição.' ,
        'Que pena!', { duration: 5000})
      } 
    }
    //Carregar as listagens das entidades relacionadas
    try{
      this.complementos = await this.complementoSrv.listar()
      this.corretores = await this.corretorSrv.listar()
      this.identificacoes = await this.identificacaoSrv.listar()
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
      if(this.imovel._id){
          // o _id existe, esse registro já foi salvo anteriormente
          // no BD e é caso de atualização
          await this.imovelSrv.atualizar(this.imovel)
      }
      else {
          await this.imovelSrv.novo(this.imovel)
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

