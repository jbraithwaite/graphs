define([

  // Models
  "models/stat",

  // Collections
  "collections/sails-collection",

  // Libraries
  "jquery",
  "underscore",
  "backbone"

  ], function(

    // Models
    Model,

    // Collections
    SailsCollection,

    // Libraries
    $,
    _,
    Backbone

  ) {

    return SailsCollection.extend({

      model: Model,

      url: function(){
        return '/api/testing';
      }

    });

  }
);
