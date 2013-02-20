// site/js/views/book.js

var app = app || {};

app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',
    template: $( '#bookTemplate' ).html(),

    render: function() {
        // tmpl is a function that takes a JSON object and returns HTML
        var tmpl = _.template( this.template );

        // this.el is what we definied in tagName. use $el to get access to JQuery html() function
        this.$el.html( tmpl( this.model.toJSON() ) );

        return this;
    },

    events: {
        'click .delete': 'deleteBook'
    },

    deleteBook: function() {
        // Delete the model
        this.model.destroy();

        // Delete the view
        this.remove();
    }
});