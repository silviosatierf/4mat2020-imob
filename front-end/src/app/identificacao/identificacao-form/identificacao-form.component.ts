import { MatSnackBar } from '@angular/material/snack-bar';
import { IdentificacaoService } from './../identificacao.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-identificacao-form',
  templateUrl: './identificacao-form.component.html',
  styleUrls: ['./identificacao-form.component.scss']
})
export class IdentificacaoFormComponent implements OnInit {

  title : string = 'Nova Identificacao'

  identificacao : any = {} // objeto vazio, nome da entidade no SINGULAR

  tipos : any = [
    {valor: 'Casa', descr: 'Casa'},
    {valor: 'Comercial', descr: 'Comercial'},
    {valor: 'Sala', descr: 'Sala'}

  ]

  constructor(
      private identificacaoSrv : IdentificacaoService,
      private snackBar : MatSnackBar,
      private location : Location,
      private actRoute : ActivatedRoute
  ) { }

  async ngOnInit(){
      //Verificando se existe 'id' na rota que trouxe ao formulario
      if(this.actRoute.snapshot.params['id']){
        try{
            // 1) Trazer o registro do back-end para o botão editar
            this.identificacao = await this.identificacaoSrv.obterUm(this.actRoute.snapshot.params['id'])
            // 2) Mudar o título da página
            this.title = 'Editando Identificacao'
        }
        catch(erro){
            console.log(erro)
            this.snackBar.open('ERRO: Não foi possivel carregar os dados para edição.' ,
            'Que pena!', { duration: 5000})
        }
      }
  }

  async salvar(form : NgForm){
    try{
      if(form.valid){
      //1) Enviar os dados para o bakc-end para serem salvos
      if(this.identificacao._id){
          // o _id existe, esse registro já foi salvo anteriormente
          // no BD e é caso de atualização
          await this.identificacaoSrv.atualizar(this.identificacao)
      }
      else {
          await this.identificacaoSrv.novo(this.identificacao)
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

