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

    // Sails and Socket
    "sails"            : "../bower/sails/sails.io",
    "socket"           : "../bower/socket.io/socket.io",

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

      "underscore": {
        "exports": '_'
      },

      "jquery": {
        "exports": '$'
      },

      "nprogress": {
        "exports": 'NProgress'
      },

      "handlebars": {
        "exports": 'Handlebars'
      },

      "bootstrap": {

        "deps": [
          "jquery"
        ]
      },

      "facebook": {
        "exports": 'FB'
      },

      "backbone": {

        "deps": [
          "underscore",
          "jquery"
        ],

        "exports": "Backbone"
      }
  }

});

require(
  [
    "jquery",
    "backbone",
    "underscore",
    "bootstrap",
    "socket",
    "sails",

    // Mixins - Extend certain functionality. Kinda important.
    "mixins/handlebar-helpers",
    "mixins/sync",
    "mixins/backbone-view",

    "router"
  ],
  function(
    $,
    Backbone,
    _,
    bootstrap,
    io,
    sails,

    m1,
    m2,
    m3,

    Router
  ) {

    // as soon as this file is loaded, connect automatically,
    App.socket = io.connect();

    // EVENT: On connect
    App.socket.on('connect', function() {
      console.debug('Socket connected');
    });

    // EVENT: On first connect
    App.socket.once('connect', function() {
      // Start the application
      new Router();
    });

    // EVENT: On Message
    App.socket.on('message', function(message) {

      // Display the message (debugging);
      console.debug('message received :: ', message);
    });

    // EVENT: On Disconnect
    App.socket.on('disconnect', function(message) {

      // Display disconnect
      console.warn('Disconnected!');

      delete App.socket;

      // Try to reconnect after 5 seconds
      setTimeout(function(){

          console.debug('Reconnecting');
          App.socket = io.connect();
      }, 1000);

    });
  }
);
