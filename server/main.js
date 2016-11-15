import { Meteor } from 'meteor/meteor';
import '../imports/api/votacao.js';
import { Votacao } from '../imports/api/votacao.js';
import '../imports/api/publications.js';

Meteor.startup(() => {
  // code to run on server at startup

  const Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  Api.addCollection(Votacao);

});
