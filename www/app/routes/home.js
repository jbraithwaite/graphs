define([

  // Models

  // Views
  "views/global",
  "views/pages/home/home-index",

  // Collections
  "collections/global",

  // Core libraries
  "jquery",
  "underscore",
  "backbone"

  ], function(

    // Models

    // Views
    views,
    View,

    // Collections
    collections,

    // Core libraries
    $,
    _,
    Backbone

  ){

    return function (options){

      options = options || {};

      // Title
      document.title = App.name;

      // Remove previous view
      views.currentView.remove();

      // Load current view
      views.currentView = new View();

      // Render and display the current view
      views.contents.$el.html(views.currentView.render().$el);

      views.trigger('loaded');
    };

  }
);
