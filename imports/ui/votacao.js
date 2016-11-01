import { Template } from 'meteor/templating';
import {Votacao} from '../api/votacao.js';

import './votacao.html';

Template.votacao.events({
  'click .remover'() {
    Meteor.call('remover', this._id);
  },

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
      Meteor.call('atualizar', _id, prefeitoUm, prefeitoDois);
    } else {
      Meteor.call('inserir', prefeitoUm, prefeitoDois);
    }
    limparCampos();
  },
  'click .votarUm'() {
    Meteor.call('votarUm', this._id, this.prefeitoUm.qtdVotos);
  },
  'click .votarDois'() {
    Meteor.call('votarDois', this._id, this.prefeitoDois.qtdVotos);
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
