import { Template } from 'meteor/templating';
import {Votacao} from '../api/votacao.js';
import {Tracker} from 'meteor/tracker';

import './votacao.html';

//ADCIONAR PACKAGE REACTIVE-DICT
//INSTANCIAR O REACTIVE-DICT NO ON CREATEAD DO TEMPLATE
//SETAR PARA FALSE PARA ESCONDER O FORM NA PRIMEIRA VEZ
//CRIAR UM BOTAO NA TELA DE ADICIONAR NOVO, COM UM EVENTO PARA SETAR O REACTIVE-DICT DO SHOWFORM PARA TRUE
//AO FINAL DO INCLUIR, SETAR O REACTIVE-DICT DO SHOWFORM PARA FALSE
//CRIAR O HERLPER E O IF NO HTML PARA ESCONDER SE ESTIVER TRUE

Template.votacao.onCreated(function() {
  this.estadoDaTela = new ReactiveDict();
  this.estadoDaTela.set('showForm', false);

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
          $('.error').toggleClass('hide');
        } else {
          instance.estadoDaTela.set('showForm', false);
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
  mostrarForm() {
    return Template.instance().estadoDaTela.get('showForm');
  }
});