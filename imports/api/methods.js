import {Meteor} from 'meteor/meteor';
import {Votacao} from './votacao.js';
import {check} from 'meteor/check';
import { HTTP } from 'meteor/http';

const restCall = function(URL, callback) {

  try {
    const result = HTTP.get(URL);
    callback(null, result.data.data);
  } catch(e) {
    console.log(e);
    callback(500, 'Erro ao acessar API');
  }
};

Meteor.methods({
  buscarVotacaoRest() {
    if(Meteor.isServer) {
      this.unblock();
      const URL = "http://localhost:3000/api/votacao";
      return Meteor.wrapAsync(restCall)(URL);
    }
  },

  atualizarVotacaoRest(votacao) {

      try {
        const URL = `http://localhost:3000/api/votacao/${votacao._id}`;

        HTTP.put(URL, { data: votacao }, function(error, response) {
          if(error) {
            console.log(error);
          } else {
            console.log(response);
          }
        });

      } catch(e) {
        console.log(e);
      }
  },

  inserirVotacaoRest(prefeitoUm, prefeitoDois) {

    try {
      const URL = `http://localhost:3000/api/votacao/`;

      const votacao = {
        prefeitoUm: {
          nome: prefeitoUm,
          qtdVotos: 0
        },
        prefeitoDois: {
          nome: prefeitoDois,
          qtdVotos: 0
        },
        userId: Meteor.userId()
      };

      HTTP.post(URL, { data: votacao }, function(error, response) {
        if(error) {
          console.log(error);
        } else {
          console.log(response);
        }
      });

    } catch(e) {
      console.log(e);
    }
  },

  removerVotacao(_id) {
    Votacao.remove( { _id: _id });
  }
});