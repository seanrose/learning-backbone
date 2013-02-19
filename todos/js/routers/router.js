// js/routers/router.js

// Todo Router
// -----------

var Workspace = Backbone.Router.extend({
    routes: {
        '*filter': 'setFilter'
    },

    setFilter: function( param ) {
        // Set the current filter to be user
        app.TodoFilter = param.trim() || '';

        // Trigger a collection filter event, causin hiding/unhiding
        // of Todo view items
        app.Todos.trigger('filter');
    }
});

app.TodoRouter = new Workspace();
Backbone.history.start();