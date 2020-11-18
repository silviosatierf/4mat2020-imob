import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {

  title : string = 'Novo curso'

  curso : any = {} // objeto vazio, nome da entidade no SINGULAR

  constructor() { }

  ngOnInit(): void {
  }

}
