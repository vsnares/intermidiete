Recipes = new Mongo.Collection('recipes', {
  transform: function(doc) {
    doc.writersObj = Writers.find({
      _id: { $in: doc.users }
    });
    return doc;
  }
});

Recipes.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
});

Ingredient = new SimpleSchema({
  name: {
    type: String
  },
  amount: {
    type: String
  }
});

RecipeSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },

  desc: {
    type: String,
    label: "Description"
  },

  ingredients: {
    type: [Ingredient]
  },

  author: {
    type: String,
    label: "Author",
    autoValue: function() {
      return this.userId
    },
    autoform: {
      type: "hidden"
    }
  },

  inMenu: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },

  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function() {
      return new Date
    },
    autoform: {
      type: "hidden"
    }
  }
});

Meteor.methods({
  toggleMenuItem: function(id, currentState) {
    Recipes.update(id, {
      $set: {
        inMenu: !currentState
      }
    });
  }
});

Recipes.attachSchema( RecipeSchema );
