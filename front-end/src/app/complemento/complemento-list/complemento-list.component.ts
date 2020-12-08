import { ComplementoService } from './../complemento.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-complemento-list',
  templateUrl: './complemento-list.component.html',
  styleUrls: ['./complemento-list.component.scss']
})
export class ComplementoListComponent implements OnInit {

    complementos : any = [] // Vetor vazio

    displayedColumns : string[] = ['codigo', 'perfil','editar', 'excluir']
    

  constructor(
      private complementoSrv : ComplementoService,
      private snackBar : MatSnackBar
      ) { }

    //Dentro do ngOnInit vai chamar o service
  async ngOnInit(){
    this.complementos = await this.complementoSrv.listar()
    console.log(this.complementos)
  }

  async excluir(id : string){
      if(confirm('Deseja realmente excluir este item?')){
        try {
            //1) Efetuar a exclusão
            await this.complementoSrv.excluir(id)
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
