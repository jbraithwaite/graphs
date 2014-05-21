define([

  // Models
  "models/vote",

  // Views
  "views/global",

  // Collections
  "collections/global",
  "collections/votes",

  // Core libraries
  "jquery",
  "underscore",
  "backbone",

  // famous
  "famous/core/Engine",
  "famous/core/Modifier",
  "famous/core/Surface",
  "famous/core/Transform",
  "famous/transitions/Transitionable",
  "famous/surfaces/ContainerSurface",
  "famous/math/Random",
  "views/famousgraph/Bargraph"

  ], function(

    // Models
    Vote,

    // Views
    views,

    // Collections
    collections,
    Votes,

    // Core libraries
    $,
    _,
    Backbone,

    // famous
    Engine,
    Modifier,
    Surface,
    Transform,
    Transitionable,
    ContainerSurface,
    Random,
    Bargraph

  ){

    return function (options){

      options = options || {};

      // Title
      document.title = App.name;

      // Remove previous view
      views.currentView.remove();

      // A Firebase collection. It's automatically kept in sync. No need to manually do fetches or sync.
      var votes = new Votes();

      // On the initial sync
      votes.on('sync', function(collection){

        // Oliver, this is where you would get your initial data from
        console.log('Sync complete, here is the collection with data', collection);

        // Now add the event on add to get future models
        votes.on('add', function(model){

          // DO NOT MANIPLATE THE MODEL, TREAT IT AS READ ONLY
          // Oliver, you will most like do a model.get('vote')
          console.log('Model Added:', model);
        });
      });


      var mainContext = Engine.createContext();
      mainContext.setPerspective(1000);

      var bargraph;
      var data = [];
      var subdata = [];
      var size = [768, 500];

      // var rnd = Random.integer(5, 50);
      var rnd = 15;
      var k = 5;
      for (var i=0; i<rnd; i++) {
          subdata = [];
          k = Random.integer(5, 15);
          for (var j=0; j<k; j++) {
              subdata.push({
                  index: j,
                  value: Random.integer(0, 2000),
                  subdata: []
              });
          }
          data[i] = {
              index: i,
              value: Random.integer(0, 2000),
              subdata: subdata
          };
      }

      var container = new ContainerSurface({
          size: size,
          properties: {
              // overflow: 'hidden'
          }
      });

      var back = new Surface({
          size: [50, 50],
          content: "Back",
          properties: {
              color: '#006699',
              fontSize: '22px'
          }
      });
      back.on('click', function() {
          bargraph.backOneLevel();
      });
      mainContext.add(new Modifier({origin: [0, 0]})).add(back);

      var containerMod = new Modifier({
        origin: [0.5, 1]
      });
      var transitionable = new Transitionable(1);

      containerMod.transformFrom(function() {
        return Transform.scale(transitionable.get(), transitionable.get(), 1);
      });

      mainContext.add(containerMod).add(container);

      bargraph = new Bargraph({
          direction: Bargraph.STYLE_COL,
          backgroundColor: '#f2f2f0',
          barColor: '#006699',
          gutterWidth: 5,
          axisWidth: 0,
          axisPadding: 0,
          size: size,
          data: data
      });

      container.add(bargraph.start());
      window.bargraph = bargraph;
      window.containerMod = containerMod;
      window.transitionable = transitionable;

      views.trigger('loaded');
    };

  }
);
