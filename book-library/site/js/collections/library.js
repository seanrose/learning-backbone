// site/js/models/book.js

var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Book,
    url: '/api/books'
});