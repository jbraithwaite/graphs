define([

  // Models

  // Views

  // Collections

  // Libraries
  "jquery",
  "underscore",
  "backbone",
  "handlebars",
  "templates",

  // famous
  "famous/core/Engine",
  "famous/core/Modifier",
  "famous/core/Transform",
  "famous/core/Surface",
  "famous/transitions/Transitionable",
  "famous/views/Deck",
  "famous/transitions/SpringTransition"

  ], function(

    // Models

    // Views

    // Collections

    // Libraries
    $,
    _,
    Backbone,
    Handlebars,
    templates,

    // famous
    Engine,
    Modifier,
    Transform,
    Surface,
    Transitionable,
    Deck,
    SpringTransition

  ) {

    return Backbone.View.extend({

      id : 'page-home',

      subviews : {},

      template : 'pages/home/home-index',

      events : {
        'click a': 'navLink'
      },

      remove : function() {
        // Remove the subviews from DOM and perform cleanup
        this.removeSubviews();

        // Backbone cleanup of a view
        Backbone.View.prototype.remove.call(this);
      },

      postRender : function() {
        Transitionable.registerMethod('spring', SpringTransition);

        var mainContext = Engine.createContext();

        var surfaces = [];
        var myLayout = new Deck({
            itemSpacing: 10,
            transition: {
                method: 'spring',
                period: 300,
                dampingRatio: 0.5
            },
            stackRotation: 0.02
        });

        myLayout.sequenceFrom(surfaces);

        for(var i = 0; i < 5; i++) {
            var temp = new Surface({
                size: [100, 200],
                classes: ['test'],
                properties: {
                    backgroundColor: 'hsla(' + ((i*5 + i)*15 % 360) + ', 60%, 50%, 0.8)'
                },
                content: i
            });

            temp.on('click', function() {
                myLayout.toggle();
            });
            surfaces.push(temp);
        }

        var containerModifier = new Modifier({
            origin: [0.5, 0.5]
        });

        mainContext.add(containerModifier).add(myLayout);

      },

      render : function() {

        var template = templates[this.template];
        var context = {};

        this.$el.html(template(context));

        _.defer(this.postRender.bind(this));

        return this;
      }
    });

  }
);
