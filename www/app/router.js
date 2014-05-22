/*
   ▄████████  ▄██████▄  ███    █▄      ███        ▄████████    ▄████████
  ███    ███ ███    ███ ███    ███ ▀█████████▄   ███    ███   ███    ███
  ███    ███ ███    ███ ███    ███    ▀███▀▀██   ███    █▀    ███    ███
 ▄███▄▄▄▄██▀ ███    ███ ███    ███     ███   ▀  ▄███▄▄▄      ▄███▄▄▄▄██▀
▀▀███▀▀▀▀▀   ███    ███ ███    ███     ███     ▀▀███▀▀▀     ▀▀███▀▀▀▀▀
▀███████████ ███    ███ ███    ███     ███       ███    █▄  ▀███████████
  ███    ███ ███    ███ ███    ███     ███       ███    ███   ███    ███
  ███    ███  ▀██████▀  ████████▀     ▄████▀     ██████████   ███    ███
  ███    ███                                                  ███    ███
*/
define([
  'jquery',
  'underscore',
  'backbone',

  // Routes
  'routes/home',
  'routes/vote',
  'routes/404',

  // Global Collections
  'collections/global',

  // Global Views
  'views/global'

], function(
    $,
    _,
    Backbone,

    // Routes
    Home,
    Vote,
    FourOhFour,

    // Global Collections
    collections,

    // Views
    views

  ){

  return Backbone.Router.extend({

    initialize: function(){

      // When this router routes... trigger actions (analytics, scroll to top, etc)
      this.on('route', this._onRoute, this);

      // Views fire an event 'loaded' when the route has completely
      // loaded it's information and has been rendered
      views.on('loaded', this._runAnalytics, this);

      // Backbone push state
      Backbone.history.start({ pushState: true });
    },

    // ROUTES
    // ==============================================================
    routes: {

      // Home
      '': 'vote',
      'graph': 'home',

      '*path': 'show404'
    },
    // ==============================================================

    _onRoute: function(route, params){
      // Scroll to the top of the window
      window.scrollTo(0,0);
    },

    _runAnalytics: function(route, params){

      var href = window.location.pathname;

      // Tracking is enabled
      if (App.tracking){

        // Mixpanel
        mixpanel.track_pageview(href);

        // Google Analytics
        ga('send', 'pageview', href);
      } else {
        console.debug('Tracking ', href);
      }
    },

    // HOME
    // --------------------------------------------------------------
    home: function (){
      new Home();
    },

    // VOTE
    // --------------------------------------------------------------
    vote: function (){
      new Vote();
    },

    // SHOW PAGE NOT FOUND (404)
    // --------------------------------------------------------------
    show404: function(){
      new FourOhFour();
    }

  });

});
