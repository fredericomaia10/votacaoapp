import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from "meteor/aldeed:simple-schema";

import './methods.js';

const Votacao = new Mongo.Collection("votacao");

const PrefeitoUmSchema = new SimpleSchema({
  nome: {type: String, label: 'Candidato 1'},
  qtdVotos: {type: Number, defaultValue: 0}
});

const PrefeitoDoisSchema = new SimpleSchema({
  nome: {type: String, label: 'Candidato 2'},
  qtdVotos: {type: Number, defaultValue: 0}
});

Votacao.schema = new SimpleSchema({
  prefeitoUm: { type: PrefeitoUmSchema },
  prefeitoDois: { type: PrefeitoDoisSchema },
  userId: {type: String, regEx: SimpleSchema.RegEx.Id}
});

//Todos são required, podemos passar optional: true

export {Votacao};