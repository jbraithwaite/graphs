define([

  // Models
  "models/vote",

  // Collections

  // Libraries
  "jquery",
  "underscore",
  "backbone",
  "backfire"

  ], function(

    // Models
    Model,

    // Collections

    // Libraries
    $,
    _,
    Backbone,
    backfire

  ) {

    return Backbone.Firebase.Collection.extend({

      model: Model,

      firebase:  App.credentials.firebase.url + '/votes'

    });

  }
);
