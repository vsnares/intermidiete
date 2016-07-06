Writers = new Mongo.Collection('writers', {
  transform: function(doc) {
    doc.eventsObj = Recipes.find({
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
  }
});


WriterSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
});

Writers.attachSchema( WriterSchema );
