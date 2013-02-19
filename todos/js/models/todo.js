var app = app || {};

// Todo Model
// ----------
// Todo model has 'title', 'order', and 'completed' attributes

app.Todo = Backbone.Model.extend({

    // Default Todo Attributes
    // Makes sure defaults are always set
    defaults : {
        title: '',
        completed: false
    },

    // Toggle for completed state of the todo
    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    }
});