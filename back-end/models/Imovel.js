const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome: { type: String, required: true},
    endereco: { type: String, required: true },
    numero: { type: Number},
    bairro: { type: String, required: true },
    area_construida:{
        type: Number,
        required: true,
    },
    areaTotal:{
        type: Number,
        required: true,
    },
    qtdeQuarto: { 
        type: Number, 
        required: true, 
        default: 2 
    },   // Valor padrão
    qtdeSuite: {
        type: Number, 
        required: true, 
        default: 2 
    },
    qtdeSala: {
        type: Number, 
        required: true, 
        default: 2 
    },
    qtdeCozinha: {
        type: Number, 
        required: true, 
        default: 2 
    },
    vagasGaragem: {
        type: Number,
        required : true,
        default: 1
    },
    qtdeBanheiro: {
        type: Number,
        required : true,
        default: 1
    },
    nome_proprietario: { type: String, required: true},

    complemento:{type: mongoose.ObjectId, ref: 'Complemento', required: true}, // Referencia a outra entidade (Chave Estrangeira)
    identificacao:{type: mongoose.ObjectId, ref: 'Identificacao', required: true},// Referencia a outra entidade (Chave Estrangeira)
    corretor:{type: mongoose.ObjectId, ref: 'Corretor', required: true}
})

// PARÂMETROS DO mongoose.model()
// 1º -> Nome do model (inicial maiúscula, igual ao nome do arquivo)
// 2º -> a constante esquema, montada anteriormente
// 3º -> o nome da COLEÇÃO no BD que irá receber os objetos que serão
//       criados a partir deste model (inicial minúscula, plural do
//       nome do model)
module.exports = mongoose.model('Imovel', esquema, 'imoveis')