import {Meteor} from 'meteor/meteor';
import {Votacao} from './votacao.js';

Meteor.methods({
  inserir(prefeitoUm, prefeitoDois) {
    Votacao.insert( {
      prefeitoUm: {
        nome: prefeitoUm,
        qtdVotos: 0
      },
      prefeitoDois: {
        nome: prefeitoDois,
        qtdVotos: 0
      }
    });
  },
  atualizar(_id, prefeitoUm, prefeitoDois) {
    Votacao.update( { _id : _id } , {
      $set: {
        'prefeitoUm.nome': prefeitoUm,
        'prefeitoDois.nome': prefeitoDois
      }
    });
  },
  remover(_id) {
    Votacao.remove({ _id: _id});
  },
  votarUm(_id, qtdVotos) {
    Votacao.update( { _id: _id } , {
      $set: { 'prefeitoUm.qtdVotos': qtdVotos + 1 }
    });
  },
  votarDois(_id, qtdVotos) {
    Votacao.update( { _id: _id } , {
      $set: { 'prefeitoDois.qtdVotos': qtdVotos + 1 }
    });
  }
});