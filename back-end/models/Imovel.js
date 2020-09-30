const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome: { type: String, required: true },
    complemento:{type: mongoose.ObjectId, ref: 'Complemento', required: true}, // Referencia a outra entidade (Chave Estrangeira)
    identificacao:{type: mongoose.ObjectId, ref: 'Identificacao', required: true},// Referencia a outra entidade (Chave Estrangeira)
    detalhe:{type: mongoose.ObjectId, ref: 'Detalhe', required: true} // Referencia a outra entidade (Chave Estrangeira)
})

// PARÂMETROS DO mongoose.model()
// 1º -> Nome do model (inicial maiúscula, igual ao nome do arquivo)
// 2º -> a constante esquema, montada anteriormente
// 3º -> o nome da COLEÇÃO no BD que irá receber os objetos que serão
//       criados a partir deste model (inicial minúscula, plural do
//       nome do model)
module.exports = mongoose.model('Imovel', esquema, 'imoveis')