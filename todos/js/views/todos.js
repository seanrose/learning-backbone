var app = app || {};

// Todo Item View
// --------------

// The DOM element for a todo Item
app.TodoView = Backbone.View.extend({

    // list tag for todo item
    tagName: 'li',

    // Cache the template function for a single item
    template: _.template( $('#item-template').html() ),

    // The DOM events specific to an item
    events: {
        'click .toggle': 'toggleCompleted',
        'dblclick label': 'edit',
        'click .destroy': 'clear',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },

    // The Todoview listens for changes to its model, re-rendering. Since there's
    // a one=to-one correspondence between a todo and a todoview in this app
    // we set a direct reference ton the model for convenience
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    // Re-renders the titles of the todo item
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );

        this.$el.toggleClass( 'completed', this.model.get('completed') );
        this.toggleVisible();

        this.$input = this.$('.edit');
        return this;
    },

    toggleVisible: function() {
        this.$el.toggleClass('hidden', this.isHidden());
    },

    isHidden: function() {
        var isCompleted = this.model.get('completed');
        return (
            (!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active')
        );
    },

    toggleCompleted: function() {
        this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass('editing');
      this.$input.focus();
    },

    // Close the editing mode, save changes to the todo
    close: function() {
        var value = this.$input.val().trim();

        if ( value ) {
            this.model.save({ title: value });
        }

        this.$el.removeClass('editing');
    },

    // If you hit enter, we're through editing the item.
    updateOnEnter: function( e ) {
        if ( e.which === ENTER_KEY ) {
            this.close();
        }
    },

    // Remove the item, destroy the model from localStorage
    // and delete its view
    clear: function() {
        this.model.destroy();
    }
});