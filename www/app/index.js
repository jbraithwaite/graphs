require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: "/app",

  paths: {

    // CDN
    "jquery": "../bower/jquery/dist/jquery",

    // Core Libraries
    // --------------------------------------------------------------
    "backbone": "../bower/backbone/backbone",
    "handlebars": "../bower/handlebars/handlebars",
    "underscore": "../bower/underscore/underscore",

    // Realtime
    "firebase" : "../bower/firebase/firebase-debug",
    "backfire" : "../bower/backfire/backbone-firebase",

    // Other core
    "nprogress": "../bower/nprogress/nprogress",
    "bootstrap": "../bower/bootstrap/dist/js/bootstrap",
    "moment" : "../bower/moment/moment",
    "async" : "../bower/async/lib/async",
    "famous": "../bower/famous",
    "pageable": "../bower/backbone.paginator/lib/backbone.paginator",

    // App specific
    "collections/global": "collections/global",
    "templates": "views/_templates/compiled"
  },

  //Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      underscore: {
        exports: '_'
      },

      jquery: {
        exports: '$'
      },

      nprogress: {
        exports: 'NProgress'
      },

      handlebars: {
        exports: 'Handlebars'
      },

      bootstrap: {

        deps: [
          "jquery"
        ]
      },

      facebook: {
        exports: 'FB'
      },

      backbone: {

        deps: [
          "underscore",
          "jquery"
        ],

        exports: "Backbone"
      },

      backfire: {

        deps: [
          "backbone",
          "jquery",
          "firebase"
        ],

        exports: "Backbone"
      }
  }

});

require(
  [
    "jquery",
    "backbone",
    "underscore",
    "bootstrap",

    // Mixins - Extend certain functionality. Kinda important.
    "mixins/handlebar-helpers",
    "mixins/sync",
    "mixins/backbone-view",

    "backfire",

    "router"
  ],
  function(
    $,
    Backbone,
    _,
    bootstrap,

    m1,
    m2,
    m3,

    backfire,

    Router
  ) {
      // Start the application
      new Router();
  }
);
