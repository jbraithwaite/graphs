define([

  // Models

  // Views

  // Collections

  // Libraries
  "jquery",
  "underscore",
  "backbone",
  "handlebars",
  "templates"

  ], function(

    // Models

    // Views

    // Collections

    // Libraries
    $,
    _,
    Backbone,
    Handlebars,
    templates

  ) {

    return Backbone.View.extend({

      el : '#sample',

      id : 'sample-id',

      tagName : 'div',

      subviews : {},

      template : 'pages/page_name/template_name',

      className : 'sample-class',

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
