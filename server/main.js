import { Meteor } from 'meteor/meteor';
import '../imports/api/votacao.js';
import { Votacao } from '../imports/api/votacao.js';
import '../imports/api/publications.js';

Meteor.startup(() => {

  /**
   * Utilizando Restivus para expor a collection Votacao via REST
   * Apenas com essas linhas de código são gerados GET, POST na URL /api/votacao
   * e GET, PUT, DELETE na URL /api/votacao/:id para os itens do banco
   */
  const Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  Api.addCollection(Votacao);

});
