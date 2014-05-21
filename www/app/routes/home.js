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
  "famous/core/EventHandler",
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
    EventHandler,
    Bargraph

  ){

    return function (options){

      options = options || {};

      // Title
      document.title = App.name;

      // Remove previous view
      views.currentView.remove();


      // famous events
      var eventHandler = new EventHandler();


      // A Firebase collection. It's automatically kept in sync. No need to manually do fetches or sync.
      var votes = new Votes();
      var graphData = {
        blogs : [],
        age : [],
        gender : []
      };

      // On the initial sync
      votes.on('sync', function(collection){

        // Oliver, this is where you would get your initial data from
        console.log('Sync complete, here is the collection with data', collection);

          collection.comparator = 'blog';
          collection.sort();

          graphData.blogs = collection.map(function(model){
            return {
              index: model.get('blog'),
              value: graphData.blogs[model.get('blog')] + 1 || 1
            };

          });

          eventHandler.emit("initGraph", graphData.blogs);

          // collection.each(function(model){


          //   // For each model, add the correct amount to the data

          //   graphData.blogs.push({
          //     index: model.get('blog'),
          //     value: 
          //   });
          // });

          console.log(graphData);
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
      // var rnd = 15;
      // var k = 5;
      // for (var i=0; i<rnd; i++) {
      //     subdata = [];
      //     k = Random.integer(5, 15);
      //     for (var j=0; j<k; j++) {
      //         subdata.push({
      //             index: j,
      //             value: Random.integer(0, 2000),
      //             subdata: []
      //         });
      //     }
      //     data[i] = {
      //         index: i,
      //         value: Random.integer(0, 2000),
      //         subdata: subdata
      //     };
      // }

      var container = new ContainerSurface({
          size: size,
          properties: {
              zIndex: 1
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

      var modal = new Surface({
        size: [undefined, undefined],
        properties: {
          backgroundColor: "#fff",
          zIndex: 0
        }
      });

      mainContext.add(modal);
      mainContext.add(new Modifier({origin: [0, 0]})).add(back);

      var cameraMod = new Modifier({
        align : [0.5, 0.5],
        origin: [0.5, 0.5]
      });
      var containerMod = new Modifier({
        origin: [0.5, 0.5]
      });
      var transitionableX = new Transitionable(0);
      var transitionableY = new Transitionable(0);
      var transitionableZ = new Transitionable(0);

      cameraMod.transformFrom(function() {
        return Transform.translate(transitionableX.get(), transitionableY.get(), transitionableZ.get());
      });

      mainContext.add(cameraMod).add(containerMod).add(container);

      // window.containerMod = containerMod;
      // window.modal = modal;
      // window.transitionableZ = transitionableZ;
      // window.transitionableX = transitionableX;
      // window.transitionableY = transitionableY;
      // window.transitionable = transitionable;

      eventHandler.on("initGraph", function (data) {
        bargraph = new Bargraph({
            direction: Bargraph.STYLE_COL,
            backgroundColor: '#fff',
            barColor: '#006699',
            gutterWidth: 5,
            axisWidth: 0,
            axisPadding: 0,
            eventHandler: eventHandler,
            size: size,
            data: graphData.blogs
        });

        container.add(bargraph.start());
        window.bargraph = bargraph;
      });

      // zoom bargraph
      eventHandler.on("zoomIn", function (offset, index) {
        transitionableX.set(-offset+350, {curve: "linear", duration: 800});
        transitionableY.set(-240, {curve: "linear", duration: 800});
        transitionableZ.set(999, {curve: "linear", duration: 800}, function() {
          eventHandler.emit("showModal", bargraph.options.barColor, index);
        });
      });

      eventHandler.on("showModal", function (color, index) {
        modal.setProperties({
          backgroundColor: color,
          zIndex: 2
        });

        _.defer(function(){
          transitionableX.set(0);
          transitionableY.set(0);
          transitionableZ.set(0);
          // debugger;
          bargraph.setOptions({
              backgroundColor: color,
              barColor: "#ffff00",
              // level: self.options.level + 1,
              data: [
                {value: 10, index: 0}, 
                {value: 10, index: 0}, 
                {value: 10, index: 0}, 
                {value: 10, index: 0}, 
                {value: 10, index: 0}, 
                {value: 10, index: 0}, 
                {value: 10, index: 0}, 
                {value: 10, index: 0}, 
                {value: 200, index: 1}
              ]
          });
          modal.setProperties({
            zIndex: 0
          });
          bargraph.start();
        }.bind(this));
      });

      views.trigger('loaded');
    };

  }
);
