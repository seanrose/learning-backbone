var app = app || {};

// Todo Collection
// ---------------

// The todos are backed to localstorage instead of a server
var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model
    model: app.Todo,

    // Save the todos under the 'todos' namespace
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // Filter down the list of all todo items that are finished
    completed: function() {
        return this.filter(function( todo ) {
            return todo.get('completed');
        });
    },

    // Filter down the list of all todo items that are *not* finished
    remaining: function() {
        return this.without.apply( this, this.completed() );
    },

    // Todos are kept in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items
    nextOrder: function() {
        if ( !this.length ) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order
    comparator: function( todo ) {
        return todo.get('order');
    }
});

// Create our global collection of Todos
app.Todos = new TodoList();