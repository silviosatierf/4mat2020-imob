import { IdentificacaoService } from './../identificacao.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-identificacao-list',
  templateUrl: './identificacao-list.component.html',
  styleUrls: ['./identificacao-list.component.scss']
})
export class IdentificacaoListComponent implements OnInit {

    identificacoes : any = [] // Vetor vazio

    displayedColumns : string[] = ['codigo', 'tipo','editar', 'excluir']
    

  constructor(
      private IdentificacaoSrv : IdentificacaoService,
      private snackBar : MatSnackBar
      ) { }

    //Dentro do ngOnInit vai chamar o service
  async ngOnInit(){
    this.identificacoes = await this.IdentificacaoSrv.listar()
    console.log(this.identificacoes)
  }

  async excluir(id : string){
      if(confirm('Deseja realmente excluir este item?')){
        try {
            //1) Efetuar a exclusão
            await this.IdentificacaoSrv.excluir(id)
            //2) Atualizar os dados da tabela
            this.ngOnInit()
            //3) Dar um feedback para o usuario
            this.snackBar.open('Item excluido com sucesso.','Entendi',{
                duration: 5000 // 5 segundos
            })
        }
        catch(erro){
            //4) Dar um feedback de erro para o usuario
            this.snackBar.open('ERRO: não foi possivel excluir este item.','Que pena!',{
                duration: 5000 // 5 segundos
            })
        }
      }
  }

}
