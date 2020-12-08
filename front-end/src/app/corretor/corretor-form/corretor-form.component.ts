import { MatSnackBar } from '@angular/material/snack-bar';
import { CorretorService } from './../corretor.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-corretor-form',
  templateUrl: './corretor-form.component.html',
  styleUrls: ['./corretor-form.component.scss']
})
export class CorretorFormComponent implements OnInit {

  title : string = 'Novo corretor'

  corretor : any = {} // objeto vazio, nome da entidade no SINGULAR

  constructor(
      private corretorSrv : CorretorService,
      private snackBar : MatSnackBar,
      private location : Location,
      private actRoute : ActivatedRoute
  ) { }

  async ngOnInit(){
      //Verificando se existe 'id' na rota que trouxe ao formulario
      if(this.actRoute.snapshot.params['id']){
        try{
            // 1) Trazer o registro do back-end para o botão editar
            this.corretor = await this.corretorSrv.obterUm(this.actRoute.snapshot.params['id'])
            // 2) Mudar o título da página
            this.title = 'Editando Corretor'
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
      if(this.corretor._id){
          // o _id existe, esse registro já foi salvo anteriormente
          // no BD e é caso de atualização
          await this.corretorSrv.atualizar(this.corretor)
      }
      else {
          await this.corretorSrv.novo(this.corretor)
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
