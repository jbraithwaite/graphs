define([
  // Collections
  "backbone"

], function(
    // Collections
    Backbone
  ){

    var collections = {};

    collections.blogs = new Backbone.Collection([
      { id: 1, name: '4chan' },
      { id: 2, name: '9to5mac' },
      { id: 3, name: 'CNET' },
      { id: 4, name: 'Engadget' },
      { id: 5, name: 'GigaOM' },
      { id: 6, name: 'Gizmodo' },
      { id: 7, name: 'Hackernews' },
      { id: 8, name: 'Huffpost Tech' },
      { id: 9, name: 'Mashable' },
      { id: 10, name: 'Reddit' },
      { id: 11, name: 'Techcrunch' },
      { id: 12, name: 'The Next Web' },
      { id: 13, name: 'The Verge' },
      { id: 14, name: 'VentureBeat' },
      { id: 15, name: 'Wired' },
      { id: 16, name: 'Zdnet' }
    ]);

    return collections;
  }
);
