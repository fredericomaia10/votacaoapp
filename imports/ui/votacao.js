import { Template } from 'meteor/templating';
import {Votacao} from '../api/votacao.js';

import './votacao.html';

Template.votacao.events({
  'click .editar'() {
    const votacao = Votacao.findOne({ _id: this._id});
    $('#prefeitoUm').val(votacao.prefeitoUm.nome);
    $('#prefeitoDois').val(votacao.prefeitoDois.nome);
    $('#_id').val(votacao._id);
  },

  'submit .votacao'(event) {
    event.preventDefault();
    const prefeitoUm = $('#prefeitoUm').val(); //JQUERY
    const prefeitoDois = $('#prefeitoDois').val(); //JQUERY
    const _id = $('#_id').val(); //JQUERY

    if(_id) {
      Votacao.update( { _id : _id } , {
        $set: {
          'prefeitoUm.nome': prefeitoUm,
          'prefeitoDois.nome': prefeitoDois
        }
      });

    } else {

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
    }

    limparCampos();
  },
  'click .votarUm'() {
    const filtro = { _id: this._id };
    Votacao.update( filtro , {
      $set: { 'prefeitoUm.qtdVotos': this.prefeitoUm.qtdVotos + 1 }
    });
  },
  'click .votarDois'() {
    const filtro = { _id: this._id };
    Votacao.update( filtro , {
      $set: { 'prefeitoDois.qtdVotos': this.prefeitoDois.qtdVotos + 1 }
    });
  }
});

function limparCampos() {
  $('.votacao').trigger("reset");
}

// function atualizarVotos(votacao, prefeito, qdtVotos) {
//   const filtro = { _id: votacao._id };
//   Votacao.update( filtro , {
//     $set: { 'prefeitoDois.qtdVotos': votacao.prefeitoDois.qtdVotos + 1 }
//   });
// }

Template.votacao.helpers({
  // teste() {
  //   return "Teste 2";
  // },
  // nomes() {
  //   return ["Nome 1", "Nome 2", "Nome 3"]
  // },
  // pessoas() {
  //   return [
  //     {
  //       nome: "Maria",
  //       idade: 40
  //     },
  //     {
  //       nome: "João",
  //       idade: 45
  //     }
  //   ]
  // },
  votacoes(){
    return Votacao.find();
  }
});
