define(["jquery", "backbone", "underscore", "moment"],

  function($, Backbone, _, moment) {

    // We want all navigation to go through this function
    Backbone.View.prototype.navLink = function(e, options){

      var isRealEvent = (typeof e.preventDefault === 'function');

      // It is possible that `e` isn't actually an event, but just an object so
      // it may not contain preventDefault();
      if (isRealEvent){
        // Prevent the default action on real events
        e.preventDefault();
      }

      options = options || {trigger:true};

      // If it is just an object, it should have the key href
      var href = (isRealEvent) ? $(e.target).attr('href') : e.href;
      var target = (isRealEvent) ? $(e.target).attr('target') : e.target;

      // If something else inside of the a is clicked
      if (_.isUndefined(href) && isRealEvent){
        href = $(e.target).closest('a').attr('href');
      }

      // Life saver. Will not follow links that have a placeholder in the href spot.
      if (href == '#'){
        return;
      }

      // Remove origin
      var origin = window.location.protocol+"//"+window.location.host;
      href = href.replace(origin,'');

      // Internal link
      if (href.indexOf('http') === -1 && target != '_blank'){

        // If the user is in the admin section, we replace the /admin/ part of the URL.
        if (window.location.pathname.search('/admin') != -1){
          href = href.replace(/\/admin\/?/,'');
        }

        // If there is no route triggered, manually track the page view
        if (!options.trigger){

          if (App.tracking)
          {
            // Mixpanel
            mixpanel.track_pageview(href);

            // Google Analytics
            ga('send', 'pageview', href);
          }
          else {
            console.debug('Track Internal Pageview', href);
          }

        }

        return Backbone.history.navigate( href , options);
      }

      this.track('Click', {Label:'External Link', href:href, target:target});

      // If the link has a target ('_blank','_parent', etc)
      if (target){
        return window.open(href, target);
      }

      // External link
      window.location = href;
    };

    // TRACKING
    // --------------------------------------------------------------
    // We want all navigation to go through this function
    Backbone.View.prototype.track = function(name, data){

      if (App.tracking){

        // For GA
        var label = data.Label;

        // Mixpanel
        // https://mixpanel.com/help/reference/javascript#sending-events
        mixpanel.track(name,data);

        // Google Analytics
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/events
        ga('send', 'event', 'Action', name, label);


      } else {
        // console.debug('Tracking ',name,data);
      }
    };

    // REMOVE SUBVIEWW
    // --------------------------------------------------------------
    // We want all navigation to go through this function
    Backbone.View.prototype.removeSubviews = function(subviews){

      if (!this.subviews && !subviews) return;

      // If subviews have been passed, only use that.
      var views = (typeof subviews === "undefined") ? this.subviews : subviews;

      _.each(views, function(view, key){
        view.remove();
      }.bind(this));
    };

    // Clear Errors
    // --------------------------------------------------------------
    Backbone.View.prototype.disableButton = function($button){
        $button
          .prop('disabled', true)
          .addClass('disabled')
          .data('oldValue', $button.val())
          .val('Please wait');

        if ($button.prop("tagName").toLowerCase() == 'button'){
          $button
            .data('oldValue', $button.html())
            .html('Please wait');
        }
    };

    // Clear Single Error
    // --------------------------------------------------------------
    Backbone.View.prototype.clearSingleError = function(e){
      // // this.$(e.target).closest('.form-group').removeClass('error');
      // this.$(e.target).siblings('.help, .help-block').addClass('faded');
    };

    // Date Wrapper
    // --------------------------------------------------------------
    Backbone.View.prototype.dateWrapper = function(date, format){
      // Not a valid date
      if (!date || !moment(date).isValid()) return '';

      // Wasn't given a format
      if (_.isUndefined(format)) format = 'LL';

      // Format is fromNow
      if (format == 'fromNow') return '<abbr title="'+moment(date).format('LLLL')+'">'+moment(date).fromNow()+'</abbr>';

      // Regular format
      return '<abbr title="'+moment(date).format('LLLL')+'">'+moment(date).format(format)+'</abbr>';
    };

    // Show Errors
    // --------------------------------------------------------------
    Backbone.View.prototype.enableButton = function($button){

      $button
        .prop('disabled', false)
        .removeClass('disabled')
        .val($button.data('oldValue'));

      if ($button.prop("tagName").toLowerCase() == 'button'){
          $button.html($button.data('oldValue'));
      }

    };

  }
);
