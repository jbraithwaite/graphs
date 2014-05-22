define([

  // Models
  "models/vote",

  // Views

  // Collections
  "collections/votes",
  "collections/global",

  // Libraries
  "jquery",
  "underscore",
  "backbone",
  "handlebars",
  "templates"

  ], function(

    // Models
    Vote,

    // Views

    // Collections
    Votes,
    collections,

    // Libraries
    $,
    _,
    Backbone,
    Handlebars,
    templates

  ) {

    return Backbone.View.extend({

      template : 'pages/vote/vote-index',

      events : {
        'click #submit': 'send'
      },

      send : function(e){
        e.preventDefault();

        $(e.target)
          .data('oldValue', $(e.target).html())
          .html('Please Wait...')
          .prop('disabled', true)
          .addClass('disabled');

        var form = {};

        form.handle = this.$('#form-handle').val();
        form.age = parseInt(this.$('#form-age').val(),10);
        form.blog = parseInt(this.$('#form-blog').val(),10);
        form.gender = this.$('#form-gender').val();

        if (!form.blog) {
          this.$('#form-blog-help').removeClass('hide');
          $(e.target)
            .html($(e.target).data('oldValue'))
            .prop('disabled', false)
            .removeClass('disabled');
          return;
        } else {
          this.$('#form-blog-help').addClass('hide');
        }

        if (!form.age) {
          form.age = _.random(16,30);
        }

        if (!form.handle) {
          form.handle = 'Anon-' + _.random(1000,30000);
        }

        if (!form.gender) {
          form.gender = 'other';
        }

        form.id = 'vote-' + _.random(1000,30000);

        var vote = new Vote(form);

        var votes = new Votes();

        votes.add(vote);
        console.log(vote);


      },

      postRender : function() {

      },

      render : function() {

        var template = templates[this.template];
        var context = {};

        context.blogs = collections.blogs.toJSON();

        this.$el.html(template(context));

        _.defer(this.postRender.bind(this));

        return this;
      }
    });

  }
);
