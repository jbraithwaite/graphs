define(["jquery", "backbone"],

  function($, Backbone) {

    // For CSRF protection, we need to add the token to each request.
    var oldSync = Backbone.sync;

    Backbone.sync = function(method, model, options){

      options.beforeSend = function(xhr){
        xhr.setRequestHeader('X-CSRF-Token', App.csrfToken);

        // The csrf cookie expired, abandon sync and refresh page to get a new one.
        if (document.cookie.indexOf('csrf_cookie') == -1){

          if (App.tracking){
            mixpanel.track(
              "Error",
              { 'mpProperties.Type': "Expired CSRF cookie" },
              function(){
                location.reload();
              }
            );
          }
        }
      };

      options.complete = function(xhr){

        // Track the error with Mixpanel
        xhr.error(function(){

          var mpProperties = {};

          mpProperties['Type'] = "Ajax Request";
          mpProperties['Status Code'] = xhr.status;
          mpProperties['Status Text'] = xhr.statusText;
          mpProperties['Response Text'] = xhr.responseText;
          mpProperties['method'] = method;
          mpProperties['URL'] = model.url;

          if (App.tracking){
            mixpanel.track("Error", mpProperties);
          }

        });
      };

      options.statusCode = {
        // 401 - the user is not authenticated on the server
        // NOTE: We may want to do a redirect instead of a refresh.
        // Someone gets stuck in an infinit loop.
        401: function(){ location.reload(); },
        // 412 - the csrf token does not match. Refresh the page to get a new one.
        412: function(){ location.reload(); }
      };

      return oldSync(method, model, options);
    };

  }

);
