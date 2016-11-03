import {Meteor} from 'meteor/meteor';
import {Votacao} from './votacao.js'

Meteor.publish('votacoes', function () {
  return Votacao.find();
});

Meteor.publish('votacoesAtivas', function () {
  return Votacao.find({ ativado: true });
});