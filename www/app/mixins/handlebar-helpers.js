define(["handlebars"],

  function(Handlebars) {

    Handlebars.registerHelper('createLinks', function(text) {

      // http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
      var exp = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return new Handlebars.SafeString(text.replace(exp,"<a href='$1' target='_blank' rel='nofollow'>$1</a>"));
    });

    // https://github.com/wycats/handlebars.js/issues/249
    // Credit: https://github.com/lazd

    // {{pluralCount dogCount 'dog'}} {{pluralize dogCount 'has' 'have'}} gone for a walk
    Handlebars.registerHelper('pluralize', function(number, singular, plural) {
        if (number === 1)
          return singular;
        else
          return (typeof plural === 'string' ? plural : singular + 's');
    });

    // The dog was on {{pluralCount couchCount 'couch' 'couches'}}
    Handlebars.registerHelper('pluralCount', function(number, singular, plural) {
        return number+' '+Handlebars.helpers.pluralize.apply(this, arguments);
    });

    // Round count
    //
    // 1000 = 1k, 100000 = 100k, 1000000 = 1.0m, 1100000 = 1.1m
    // --------------------------------------------------------------
    Handlebars.registerHelper('roundCount', function(number) {

      number = Math.round(number);

      // Over a million
      if (number >= 1000000) number = (number/ 1000000).toFixed(1) + 'm';
      // Over 10,000
      else if(number >= 1000) number = Math.round(number / 1000) + 'k';

      return number;

    });

  }
);
