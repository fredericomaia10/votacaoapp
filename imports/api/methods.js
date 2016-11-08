import {Meteor} from 'meteor/meteor';
import {Votacao} from './votacao.js';
import {check} from 'meteor/check';

Meteor.methods({
  'inserirVotacao'(prefeitoUm, prefeitoDois) {
    check(prefeitoUm, String);
    check(prefeitoDois, String);

    const votacao = {
      prefeitoUm: {
        nome: prefeitoUm,
        qtdVotos: 0
      },
      prefeitoDois: {
        nome: prefeitoDois,
        qtdVotos: 0
      },
      userId: Meteor.userId(),
      // campoQualquerNaoMapeado: "testando"
    };

    Votacao.schema.clean(votacao);
    Votacao.schema.validate(votacao);

    Votacao.insert(votacao);
  },

  atualizarVotacao(_id, prefeitoUm, prefeitoDois) {
    Votacao.update( { _id : _id } , {
      $set: {
        'prefeitoUm.nome': prefeitoUm,
        'prefeitoDois.nome': prefeitoDois
      }
    });
  },

  removerVotacao(_id) {
    Votacao.remove( { _id: _id });
  }
});