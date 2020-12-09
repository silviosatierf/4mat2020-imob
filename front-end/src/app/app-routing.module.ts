import { VisitaListComponent } from './visita/visita-list/visita-list.component';
import { VisitaFormComponent } from './visita/visita-form/visita-form.component';
import { ImovelListComponent } from './imovel/imovel-list/imovel-list.component';
import { ImovelFormComponent } from './imovel/imovel-form/imovel-form.component';
import { IdentificacaoListComponent } from './identificacao/identificacao-list/identificacao-list.component';
import { IdentificacaoFormComponent } from './identificacao/identificacao-form/identificacao-form.component';
import { ComplementoListComponent } from './complemento/complemento-list/complemento-list.component';
import { ComplementoFormComponent } from './complemento/complemento-form/complemento-form.component';
import { CorretorFormComponent } from './corretor/corretor-form/corretor-form.component';
import { CorretorListComponent } from './corretor/corretor-list/corretor-list.component';
import { TurmaListComponent } from './turma/turma-list/turma-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoListComponent } from './curso/curso-list/curso-list.component';
import { CursoFormComponent } from './curso/curso-form/curso-form.component';
import { TurmaFormComponent } from './turma/turma-form/turma-form.component';

const routes: Routes = [
    // Rotas no Angular NUNCA  começam com /
    {path: 'visita', component: VisitaListComponent},
    {path: 'visita/novo', component: VisitaFormComponent},
    {path: 'visita/:id', component: VisitaFormComponent},

    {path: 'imovel', component: ImovelListComponent},
    {path: 'imovel/novo', component: ImovelFormComponent},
    {path: 'imovel/:id', component: ImovelFormComponent},

    {path: 'identificacao', component: IdentificacaoListComponent},
    {path: 'identificacao/novo', component: IdentificacaoFormComponent},
    {path: 'identificacao/:id', component: IdentificacaoFormComponent},


    {path: 'complemento', component: ComplementoListComponent},
    {path: 'complemento/novo', component: ComplementoFormComponent},
    {path: 'complemento/:id', component: ComplementoFormComponent},

    {path: 'corretor', component: CorretorListComponent},
    {path: 'corretor/novo', component: CorretorFormComponent},
    {path: 'corretor/:id', component: CorretorFormComponent},

    {path: 'curso', component: CursoListComponent}, 
    {path: 'curso/novo', component: CursoFormComponent},
    {path: 'curso/:id', component: CursoFormComponent},

    {path: 'turma', component: TurmaListComponent},
    {path: 'turma/novo', component: TurmaFormComponent},
    {path: 'turma/:id', component: TurmaFormComponent},
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
