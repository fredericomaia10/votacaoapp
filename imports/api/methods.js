import {Meteor} from 'meteor/meteor';
import {Votacao} from './votacao.js';
import {check} from 'meteor/check';
import { HTTP } from 'meteor/http';

/**
 * Link de referência da doc do Meteor de HTTP.
 * http://docs.meteor.com/api/http.html#HTTP-post
 *
 * Link de referência com tutorial do Meteor HTTP
 * https://themeteorchef.com/snippets/using-the-http-package/
 */

Meteor.methods({
  /**
   * Usa o restCall pra realizar o Get. Foi colocado o Meteor.isServer pois não é possível
   * realizar chamada HTTP no cliente. Como este arquivo é importado no cliente, mostrava um erro.
   */
  buscarVotacaoRest() {
    if(Meteor.isServer) {
      this.unblock();
      const URL = "http://localhost:3000/api/votacao";
      return Meteor.wrapAsync(restCall)(URL);
    }
  },

  atualizarVotacaoRest(votacao) {
    if(Meteor.isServer) {
      try {
        const URL = `http://localhost:3000/api/votacao/${votacao._id}`;

        HTTP.put(URL, {data: votacao}, function (error, response) {
          if (error) {
            console.log(error);
          } else {
            console.log(response);
          }
        });

      } catch (e) {
        console.log(e);
      }
    }
  },

  inserirVotacaoRest(prefeitoUm, prefeitoDois) {
    if(Meteor.isServer) {
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

        HTTP.post(URL, {data: votacao}, function (error, response) {
          if (error) {
            console.log(error);
          } else {
            console.log(response);
          }
        });

      } catch (e) {
        console.log(e);
      }
    }
  },

  removerVotacao(_id) {
    if(Meteor.isServer) {
      try {
        const URL = `http://localhost:3000/api/votacao/${_id}`;

        HTTP.del(URL, function (error, response) {
          if (error) {
            console.log(error);
          } else {
            console.log(response);
          }
        });

      } catch (e) {
        console.log(e);
      }
    }
  }
});

/**
 * Função criada pra encapsular o GET. Sempre que fizer um GET via REST é só chamá-lo.
 * @param URL
 * @param callback
 */
const restCall = function(URL, callback) {

  try {
    const result = HTTP.get(URL);
    callback(null, result.data.data);
  } catch(e) {
    console.log(e);
    callback(500, 'Erro ao acessar API');
  }
};