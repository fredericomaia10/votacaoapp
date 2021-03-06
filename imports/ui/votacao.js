import { Template } from 'meteor/templating';
import {Votacao} from '../api/votacao.js';
import {Tracker} from 'meteor/tracker';

import './mensagens.html';
import './votacao.html';

Template.votacao.onCreated(function() {
  this.estadoDaTela = new ReactiveDict();
  this.estadoDaTela.set('showForm', false);
  this.estadoDaTela.set('mensagemErro', null);
  this.estadoDaTela.set('mensagemSucesso', null);

  Tracker.autorun(() => {
    Meteor.subscribe('votacoesPorUsuario', Meteor.userId());
  });
});

Template.votacao.events({
  'click .js-show-form'(event, instance){
    instance.estadoDaTela.set('showForm', true);
  },
  'click .js-cancelar-show-form'(event, instance){
    event.preventDefault();
    instance.estadoDaTela.set('showForm', false);
    instance.estadoDaTela.set('mensagemErro', null);
  },
  'click .js-remover'(){
    Meteor.call('removerVotacao', this._id);
  },
  'click .js-editar'() {
    const votacao = Votacao.findOne({ _id: this._id});
    $('#prefeitoUm').val(votacao.prefeitoUm.nome);
    $('#prefeitoDois').val(votacao.prefeitoDois.nome);
    $('#_id').val(votacao._id);
  },

  'submit .votacao'(event, instance) {
    event.preventDefault();
    const prefeitoUm = $('#prefeitoUm').val(); //JQUERY
    const prefeitoDois = $('#prefeitoDois').val(); //JQUERY
    const _id = $('#_id').val(); //JQUERY

    if(_id) {
      Meteor.call('atualizarVotacao', _id, prefeitoUm, prefeitoDois);
    } else {
      Meteor.call('inserirVotacao', prefeitoUm, prefeitoDois, function(error, response) {
        if(error) {
          instance.estadoDaTela.set('mensagemErro', error.reason);
        } else {
          instance.estadoDaTela.set('showForm', false);
          instance.estadoDaTela.set('mensagemErro', null);
          instance.estadoDaTela.set('mensagemSucesso', 'Criado com sucesso!');
          limparCampos();
        }
      });
    }

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
  //Substituído pelo Helper Global
  // isLogado() {
  //   return Meteor.userId();
  // },
  mostrarForm() {
    return Template.instance().estadoDaTela.get('showForm');
  },
  mensagemErro() {
    return Template.instance().estadoDaTela.get('mensagemErro');
  },
  mensagemSucesso() {
    return Template.instance().estadoDaTela.get('mensagemSucesso');
  }
});