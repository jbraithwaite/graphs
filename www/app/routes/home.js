define([

  // Models

  // Views
  "views/global",
  // "views/pages/home/home-index",

  // Collections
  "collections/global",

  // Core libraries
  "jquery",
  "underscore",
  "backbone",

  // famous
  "famous/core/Engine",
  "famous/core/Modifier",
  "famous/core/Surface",
  "famous/surfaces/ContainerSurface",
  "famous/math/Random",
  "views/famousgraph/Bargraph"

  ], function(

    // Models

    // Views
    views,
    // View,

    // Collections
    collections,

    // Core libraries
    $,
    _,
    Backbone,

    // famous
    Engine,
    Modifier,
    Surface,
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

      // Load current view
      // views.currentView = new View();

      // Render and display the current view
      // views.contents.$el.html(views.currentView.render().$el);

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
      mainContext.add(new Modifier({origin: [0.5, 0.5]})).add(container);

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

      views.trigger('loaded');
    };

  }
);
