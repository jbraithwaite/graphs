define([

  // Views
  "views/structure/loadingbar/loadingbar-index",

  // Collections
  'collections/global'

], function(
    // Views
    Loadingbar,

    // Collections
    collections

  ){

  var views = {};

  // Add events to this object
  _.extend(views, Backbone.Events);

  // Main content
  views.contents = new Backbone.View({el:'#content'});

  // Store the current view
  views.currentView = new Backbone.View();

  // Loading bar
  views.loadingbar = new Loadingbar();

  return views;
});
