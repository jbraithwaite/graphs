define([

  // Models
  "models/vote",

  // Collections

  // Libraries
  "jquery",
  "underscore",
  "backbone"

  ], function(

    // Models
    Model,

    // Collections

    // Libraries
    $,
    _,
    Backbone

  ) {

    return Backbone.Firebase.Collection.extend({

      model: Model,

      firebase:  App.credentials.firebase.url + '/votes'

    });

  }
);
