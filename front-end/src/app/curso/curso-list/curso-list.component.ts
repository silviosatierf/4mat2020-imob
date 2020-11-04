import { CursoService } from './../curso.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.scss']
})
export class CursoListComponent implements OnInit {

    cursos : any = [] // Vetor vazio

  constructor(private cursoSrv : CursoService) { }

    //Dentro do ngOnInit vai chamar o service
  async ngOnInit(){
    this.cursos = await this.cursoSrv.listar()
    console.log(this.cursos)

  }

}
