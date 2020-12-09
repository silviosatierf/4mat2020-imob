import { VisitaService } from './../visita.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-visita-list',
  templateUrl: './visita-list.component.html',
  styleUrls: ['./visita-list.component.scss']
})
export class VisitaListComponent implements OnInit {

    visitas : any = [] // Vetor vazio
   

    displayedColumns : string[] = ['nome', 'imovel', 'periodo','dias_semana','horario','editar', 'excluir']

  constructor(
      private visitaSrv : VisitaService,
      private snackBar : MatSnackBar
      ) { }

    //Dentro do ngOnInit vai chamar o service
  async ngOnInit(){
    this.visitas = await this.visitaSrv.listar()
    console.log(this.visitas)
  }

  async excluir(id : string){
      if(confirm('Deseja realmente excluir este item?')){
        try {
            //1) Efetuar a exclusão
            await this.visitaSrv.excluir(id)
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
