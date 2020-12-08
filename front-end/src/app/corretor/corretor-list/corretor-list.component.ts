import { CorretorService } from './../corretor.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-corretor-list',
  templateUrl: './corretor-list.component.html',
  styleUrls: ['./corretor-list.component.scss']
})
export class CorretorListComponent implements OnInit {

    corretores : any = [] // Vetor vazio

    displayedColumns : string[] = ['nome', 'cod_creci', 'editar', 'excluir']
    

  constructor(
      private corretorSrv : CorretorService,
      private snackBar : MatSnackBar
      ) { }

    //Dentro do ngOnInit vai chamar o service
  async ngOnInit(){
    this.corretores = await this.corretorSrv.listar()
    console.log(this.corretores)
  }

  async excluir(id : string){
      if(confirm('Deseja realmente excluir este item?')){
        try {
            //1) Efetuar a exclusão
            await this.corretorSrv.excluir(id)
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

