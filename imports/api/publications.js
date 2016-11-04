import {Meteor} from 'meteor/meteor';
import {Votacao} from './votacao.js';

Meteor.publish('todasVotacoes', function () {
  return Votacao.find();
});

Meteor.publish('votacoesPorUsuario', function (userId) {
  return Votacao.find( { userId:  userId} );
});