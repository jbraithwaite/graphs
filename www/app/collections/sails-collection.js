define([

  // Models

  // Collections

  // Libraries
  "pageable",
  "jquery",
  "underscore",
  "backbone"

  ], function(

    // Models

    // Collections

    // Libraries
    PageableCollection,
    $,
    _,
    Backbone

  ) {

    return PageableCollection.extend({


      sync: function(method, collection, options) {

        var where = {};

        if (options.hasOwnProperty('where')) {
          where.where = options.where;
        }

        var url = typeof this.url === 'function' ? this.url() : this.url;

        // Manually create a query string that works with sails.js
        if (options.data){

          var paginationOptions = {};

          paginationOptions['skip'] = (options.data.page - 1) * options.data.per_page;
          paginationOptions['limit'] = options.data.per_page;

          if (options.data.where){
            paginationOptions['where'] = JSON.stringify(options.data.where);
          }

          url += '?'+ $.param(paginationOptions);
        }

        try {
          if (method == 'read') {
            App.socket.get(url, where, function(response){

              if (!response.hasOwnProperty('error') && !response.hasOwnProperty('errors')) return options.success(response);

              options.error(response);
            });
          }
        } catch (err) {

          if (App.tracking) {
            Raven.captureException(err);
          }

          options.error(err);
        }
      }

    });

  }
);
