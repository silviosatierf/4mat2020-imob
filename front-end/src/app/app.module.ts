// Bem no inicio do arquivo app.module.ts
import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Na secção de imports do app.module.ts
// Habilitar formatação de moeda e data em protugues
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainToolbarComponent } from './ui/main-toolbar/main-toolbar.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { MainFooterComponent } from './ui/main-footer/main-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CursoListComponent } from './curso/curso-list/curso-list.component';
import { CursoFormComponent } from './curso/curso-form/curso-form.component';
import {​​ FormsModule }​​ from '@angular/forms';
import { TurmaListComponent } from './turma/turma-list/turma-list.component';
import { TurmaFormComponent } from './turma/turma-form/turma-form.component';
import { CorretorListComponent } from './corretor/corretor-list/corretor-list.component';
import { CorretorFormComponent } from './corretor/corretor-form/corretor-form.component';
import { ComplementoListComponent } from './complemento/complemento-list/complemento-list.component';
import { ComplementoFormComponent } from './complemento/complemento-form/complemento-form.component';
import { IdentificacaoListComponent } from './identificacao/identificacao-list/identificacao-list.component';
import { IdentificacaoFormComponent } from './identificacao/identificacao-form/identificacao-form.component';
import { ImovelListComponent } from './imovel/imovel-list/imovel-list.component';
import { ImovelFormComponent } from './imovel/imovel-form/imovel-form.component';
import { VisitaListComponent } from './visita/visita-list/visita-list.component';
import { VisitaFormComponent } from './visita/visita-form/visita-form.component';



@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainMenuComponent,
    MainFooterComponent,
    CursoListComponent,
    CursoFormComponent,
    TurmaListComponent,
    TurmaFormComponent,
    CorretorListComponent,
    CorretorFormComponent,
    ComplementoListComponent,
    ComplementoFormComponent,
    IdentificacaoListComponent,
    IdentificacaoFormComponent,
    ImovelListComponent,
    ImovelFormComponent,
    VisitaListComponent,
    VisitaFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatMomentDateModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    // No app.module.ts, dentro seção providers
    /**** Datas em português no MatDatepicker  ****/
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
    /**********************************************/ 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
