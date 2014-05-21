define([

  // Models
  "models/vote",

  // Views
  "views/global",
  "views/pages/vote/vote-index",

  // Collections
  "collections/global",
  "collections/votes",

  // Core libraries
  "jquery",
  "underscore",
  "backbone"

  ], function(

    // Models
    Vote,

    // Views
    views,
    View,

    // Collections
    collections,
    Votes,

    // Core libraries
    $,
    _,
    Backbone

  ){

    return function (){

      // Title
      document.title = App.name + ' | ' + 'Vote';

      // var votes = new Votes();

      // var vote = new Vote({id: 'nonameplayer5', handle:'nonameplayer', age: 29, vote: 5, createdAt: new Date().getTime()});
      // votes.add(vote);

      // Remove previous view
      views.currentView.remove();

      // // Render View
      views.currentView  = new View();
      views.contents.$el.html(views.currentView.render().$el);

      views.trigger('loaded');
    };

  }
);
