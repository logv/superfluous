var Todo = Backbone.Model.extend({
  // Default attributes for the todo
  // and ensure that each todo created has `title` and `completed` keys.
  defaults: {
    title: '',
    completed: false
  },

  // Toggle the `completed` state of this todo item.
  toggle: function() {
    this.save({
      completed: !this.get('completed')
    });
  }
});

var TodoList = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: Todo,


  // Filter down the list of all todo items that are finished.
  completed: function() {
    return this.filter(function( todo ) {
      return todo.get('completed');
    });
  },

  remaining: function() {
    return this.without.apply(this, this.completed());
  },

  // We keep the Todos in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder: function () {
    if (!this.length) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  // Todos are sorted by their original insertion order.
  comparator: function (todo) {
    return todo.get('order');
  }
});

module.exports = {
  Todo: Todo,
  TodoList: TodoList
}
