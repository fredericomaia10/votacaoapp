import { Meteor } from 'meteor/meteor';
import {TAPi18n} from "meteor/tap:i18n";

import '../imports/ui/votacao.js';

Meteor.startup(() => {
  T9n.setLanguage("pt");

  TAPi18n.setLanguage('pt-BR').done(() => {
    console.log("Idioma alterado para pt-BR");
  }).fail((error) => {
    console.log(error);
  });

});

Template.body.events({
  'click .logout'(e) {
    e.preventDefault();
    AccountsTemplates.logout();
  }
});

Template.registerHelper( 'isLogado', () => {
  return Meteor.userId();
});