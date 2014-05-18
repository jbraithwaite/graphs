define([

  // Models

  // Views
  "views/global",
  "views/pages/404",

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

    return function (code){

      // Title
      document.title = App.name + ' | ' + 'Page Not Found';

      // Remove previous view
      views.currentView.remove();

      // // Render View
      views.currentView  = new View();
      views.contents.$el.html(views.currentView.render().$el);

      views.trigger('loaded');
    };

  }
);
