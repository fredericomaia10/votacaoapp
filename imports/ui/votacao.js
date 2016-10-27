import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Votacao} from '../api/votacao.js';

import './votacao.html';

Template.votacao.events({
  'submit .votacao'(event) {
    event.preventDefault();
    const form = event.target;
    const prefeitoUm = form.prefeitoUm.value; //Target

    const prefeitoDois = $('#prefeitoDois').val(); //JQUERY

    const votacao = {
      prefeitoUm: {
        nome: prefeitoUm,
        qtdVotos: 0
      },
      prefeitoDois: {
        nome: prefeitoDois,
        qtdVotos: 0
      }
    };
    Votacao.insert( votacao );

    $('#prefeitoDois').val("");
    form.prefeitoUm.value = "";

    alert("Cadastrado com sucesso!");
  }
});
