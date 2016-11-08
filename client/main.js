import '../imports/ui/votacao.js';

Meteor.startup(() => {
  T9n.setLanguage("pt");
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