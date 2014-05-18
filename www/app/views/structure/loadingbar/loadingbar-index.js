define([

  // Models

  // Views

  // Collections

  // Misc
  "nprogress",
  "jquery",
  "underscore",
  "backbone",
  "handlebars"

  ], function(

    // Models

    // Views

    // Collections

    // Misc
    NProgress,
    $,
    _,
    Backbone,
    Handlebars

  ) {

    return Backbone.View.extend({

      initialize : function(){
        NProgress.configure({
          minimum: 0.1,
          trickle: true,
          showSpinner: false
        });
      },

      start : function(){
        NProgress.start();
      },

      set : function(number){
        NProgress.set(number);
      },

      /**
       * Incrementing: To increment the progress bar, just use .inc()
       * This increments it with a random amount. This will never get to 100%: use it for every image load (or similar).
       */
      inc : function(){
        NProgress.inc();
      },

      /**
       * Force-done: By passing true to done(), it will show the progress bar even if it's not being shown.
       * (The default behavior is that .done() will not do anything if .start() isn't called)
       */
      done : function(force){
        NProgress.done(force);
      },

      render: function(){
        return this;
      }
    });

  }
);
