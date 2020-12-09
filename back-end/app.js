var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const db = require('./config/database')
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME
db(`mongodb+srv://${dbUser}:${dbPass}@cluster0.koos7.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`)


var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Criação de uma nova rota
const teste = require('./routes/teste')
app.use('/teste', teste)

// Rota para curso
const curso = require('./routes/curso')
app.use('/curso', curso)

// Rota para professor
const professor = require('./routes/professor')
app.use('/professor', professor)

// Rota para sala-aula
const sala_aula = require('./routes/sala_aula')
app.use('/sala-aula', sala_aula)

// Rota para turma
const turma = require('./routes/turma')
app.use('/turma', turma)

// Rota para complemento
const complemento = require('./routes/complemento')
app.use('/complemento', complemento)

// Rota para detalhe
const detalhe = require('./routes/detalhe')
app.use('/detalhe', detalhe)

// Rota para identificação
const identificacao = require('./routes/identificacao')
app.use('/identificacao', identificacao)

// Rota para Imovel
const imovel = require('./routes/imovel')
app.use('/imovel', imovel)

// Rota para Visita
const visita = require('./routes/visita')
app.use('/visita', visita)

// Rota para Corretor
const corretor = require('./routes/corretor')
app.use('/corretor', corretor)

module.exports = app;
