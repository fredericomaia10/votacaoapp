import { Template } from 'meteor/templating';
import {Votacao} from '../api/votacao.js';

import './votacao.html';

Template.votacao.events({
  'click .js-remover'(){
    remover(this._id);
  },
  'click .js-editar'() {
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
      Meteor.call('atualizarVotacao', _id, prefeitoUm, prefeitoDois);
    } else {
      Meteor.call('inserirVotacao', prefeitoUm, prefeitoDois, function(error, response) {
        if(error) {
          $('.error').toggleClass('hide');
        } else {
          alert('Sucesso!');
        }
      });
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

Template.votacao.helpers({
  votacoes(){
    return Votacao.find();
  },
  isLogado() {
    return Meteor.userId();
  }
});


function remover(id) {
  Votacao.remove( { _id: id });
}