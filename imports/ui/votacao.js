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
  this.estadoDaTela.set('votacoes', null);
  this.estadoDaTela.set('votacao', null);

  buscarVotacoes(this);

  Tracker.autorun(() => {
    Meteor.subscribe('votacoesPorUsuario', Meteor.userId());
  });
});

Template.votacao.events({
  'click .js-show-form'(event, instance){
    mostrarForm(instance);
  },
  'click .js-cancelar-show-form'(event, instance){
    event.preventDefault();
    esconderForm(instance);
    instance.estadoDaTela.set('mensagemErro', null);
  },
  'click .js-remover'(event, instance){
    Meteor.call('removerVotacao', this._id, () => {
      buscarVotacoes(instance);
    });
  },
  'click .js-editar'(event, instance) {
    const votacao = this;
    instance.estadoDaTela.set('votacao', votacao);
    mostrarForm(instance);
  },

  'submit .votacao'(event, instance) {
    event.preventDefault();

    const _id = $('#_id').val();

    if(_id) {

      //PUT
      const votacao = instance.estadoDaTela.get('votacao');

      votacao.prefeitoUm.nome = $('#prefeitoUm').val();
      votacao.prefeitoDois.nome = $('#prefeitoDois').val();

      Meteor.call('atualizarVotacaoRest', votacao, (error, response) => {
        esconderForm(instance);
        limparCampos();
        buscarVotacoes(instance);
      });

    } else {

      //POST
      Meteor.call('inserirVotacaoRest', $('#prefeitoUm').val(), $('#prefeitoDois').val(), function(error) {
        if(error) {
          instance.estadoDaTela.set('mensagemErro', error.reason);
        } else {
          instance.estadoDaTela.set('mensagemErro', null);
          instance.estadoDaTela.set('mensagemSucesso', 'Criado com sucesso!');
          esconderForm(instance);
          limparCampos();
          buscarVotacoes(instance);
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
  votacao(){
    return Template.instance().estadoDaTela.get('votacao');
  },
  votacoes(){
    return Template.instance().estadoDaTela.get('votacoes');
  },
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

/**
 * Buscar os dados através do method e seta na instância da tela.
 * Assim que tem o retorno, atualiza a tabela.
 * @param instance
 */
function buscarVotacoes(instance) {

  Meteor.call('buscarVotacaoRest', (error, response) => {
    if(error){
      console.log(error);
    } else {
      instance.estadoDaTela.set('votacoes', response);
    }
  });
}

function mostrarForm(instance) {
  instance.estadoDaTela.set('showForm', true);
}

function esconderForm(instance) {
  instance.estadoDaTela.set('showForm', false);
}
