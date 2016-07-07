Writers = new Mongo.Collection('writers', {
  transform: function(doc) {
    doc.recipesObj = Recipes.find({
      writers: { $in: [ doc._id ] }
    });
    return doc;
  }
});

Writers.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  },

});


WriterSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
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

  recipes: {
    type: [String]
  }
});

Writers.attachSchema( WriterSchema );
