import { Template } from 'meteor/templating';
import {Votacao} from '../api/votacao.js';
import {Tracker} from 'meteor/tracker';

import './mensagens.html';
import './votacao.html';

Template.votacao.onCreated(function() {
  this.estadoDaTela = new ReactiveDict();
  this.estadoDaTela.set('formVisivel', false);
  this.estadoDaTela.set('mensagemErro', null);
  this.estadoDaTela.set('mensagemSucesso', null);

  Tracker.autorun(() => {
    Meteor.subscribe('votacoesPorUsuario', Meteor.userId());
  });
});

Template.votacao.events({

  'click .js-show-form'(e, instance){
    mostrarForm(instance);
  },

  'click .js-cancelar-show-form'(e, instance){
    esconderForm(instance);
    limparCampos(instance);
  },

  'click .js-remover'(){
    removerVotacao(this._id);
  },

  'click .js-editar'() {
    editarVotacao(this._id);
  },

  'submit .votacao'(e, instance) {
    e.preventDefault();
    const prefeitoUm = $('#prefeitoUm').val();
    const prefeitoDois = $('#prefeitoDois').val();
    const _id = $('#_id').val();
    if(_id) {
      atualizarVotacao(_id, prefeitoUm, prefeitoDois);
    } else {
      inserirVotacao(prefeitoUm, prefeitoDois, instance);
    }
  },

  'click .votarUm'() {
    votarCandidatoUm(this._id);
  },

  'click .votarDois'() {
    votarCandidatoDois(this._id);
  }

});

Template.votacao.helpers({

  votacoes(){
    return Votacao.find();
  },

  mostrarForm() {
    return Template.instance().estadoDaTela.get('formVisivel');
  },

  mensagemErro() {
    return Template.instance().estadoDaTela.get('mensagemErro');
  },

  mensagemSucesso() {
    return Template.instance().estadoDaTela.get('mensagemSucesso');
  }

});

function limparCampos(instance) {
  instance.estadoDaTela.set('mensagemErro', null);
  $('.votacao').trigger("reset");
}

function mostrarForm(instance) {
  instance.estadoDaTela.set('formVisivel', true);
}

function esconderForm(instance) {
  instance.estadoDaTela.set('formVisivel', false);
}

function editarVotacao(_id) {
  const votacao = Votacao.findOne({_id: _id});
  $('#prefeitoUm').val(votacao.prefeitoUm.nome);
  $('#prefeitoDois').val(votacao.prefeitoDois.nome);
  $('#_id').val(votacao._id);
}

function mostrarMensagemErro(instance, msg) {
  instance.estadoDaTela.set('mensagemErro', msg);
}

function tratarErroForm(err, instance) {
  if (err.error == 'validation-error') {
    mostrarMensagemErro(instance, err.reason);
  }
}

function mostrarMensagemSucesso(instance, msg) {
  instance.estadoDaTela.set('mensagemSucesso', msg);
}

function inserirVotacao(prefeitoUm, prefeitoDois, instance) {
  Meteor.call('inserirVotacao', prefeitoUm, prefeitoDois, function (err, response) {
    if (err) {
      tratarErroForm(err, instance);
    } else {
      esconderForm(instance);
      mostrarMensagemSucesso(instance, 'Inserido com sucesso!');
      limparCampos(instance);
    }
  });
}

function atualizarVotacao(_id, prefeitoUm, prefeitoDois) {
  Meteor.call('atualizarVotacao', _id, prefeitoUm, prefeitoDois);
}

function votarCandidatoUm(_id) {
  const filtro = {_id: _id};
  Votacao.update(filtro, {
    $set: {'prefeitoUm.qtdVotos': this.prefeitoUm.qtdVotos + 1}
  });
}

function votarCandidatoDois(_id) {
  const filtro = {_id: _id};
  Votacao.update(filtro, {
    $set: {'prefeitoDois.qtdVotos': this.prefeitoDois.qtdVotos + 1}
  });
}

function removerVotacao(_id) {
  Meteor.call('removerVotacao', _id);
}