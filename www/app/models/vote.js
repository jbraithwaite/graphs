define([

  // Models

  // Collections

  // Libraries
  "jquery",
  "underscore",
  "backbone"
  // "backfire"

  ], function(

    // Models

    // Collections


    // Libraries
    $,
    _,
    Backbone
    // backfire

  ) {

    return Backbone.Model.extend({

      defaults : {
        vote : null,
        age : null,
        gender : null,
        handle : null
      }

    });
  }

);
