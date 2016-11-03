import {Meteor} from 'meteor/meteor';
import {Votacao} from './votacao.js';
import {check} from 'meteor/check';

Meteor.methods({
  inserirVotacao(prefeitoUm, prefeitoDois) {
    check(prefeitoUm, String);
    check(prefeitoDois, String);

    Votacao.insert( {
      prefeitoUm: {
        nome: prefeitoUm,
        qtdVotos: 0
      },
      prefeitoDois: {
        nome: prefeitoDois,
        qtdVotos: 0
      }
    } );
  },

  atualizarVotacao(_id, prefeitoUm, prefeitoDois) {
    Votacao.update( { _id : _id } , {
      $set: {
        'prefeitoUm.nome': prefeitoUm,
        'prefeitoDois.nome': prefeitoDois
      }
    });
  }
});