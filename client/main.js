import {Template} from 'meteor/templating';
import {T9n} from 'meteor/softwarerero:accounts-t9n';

import '../imports/ui/votacao.js';
import '../imports/ui/accountsConfig.js';

Meteor.startup(() => {
  T9n.setLanguage('pt');
});

Template.body.events({
  'click .js-sair'(e) {
    e.preventDefault();
    AccountsTemplates.logout();
  }
});

//Substituído pelo Helper Global
// Template.body.helpers({
//   isLogado() {
//     return Meteor.userId();
//   }
// });

//Helper Global
Template.registerHelper('isLogado', function() {
  return Meteor.userId();
});