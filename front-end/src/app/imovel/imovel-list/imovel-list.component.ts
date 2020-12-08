import { ImovelService } from './../imovel.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-imovel-list',
  templateUrl: './imovel-list.component.html',
  styleUrls: ['./imovel-list.component.scss']
})
export class ImovelListComponent implements OnInit {

    imoveis : any = [] // Vetor vazio

    displayedColumns : string[] = ['nome', 'complemento','identificacao' ,'corretor','editar', 'excluir']
    

  constructor(
      private imovelSrv : ImovelService,
      private snackBar : MatSnackBar
      ) { }

    //Dentro do ngOnInit vai chamar o service
  async ngOnInit(){
    this.imoveis = await this.imovelSrv.listar()
    console.log(this.imoveis)
  }

  async excluir(id : string){
      if(confirm('Deseja realmente excluir este item?')){
        try {
            //1) Efetuar a exclusão
            await this.imovelSrv.excluir(id)
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
