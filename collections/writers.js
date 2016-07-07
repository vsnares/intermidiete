Routes = new Mongo.Collection('routes', {
  // transform: function(doc) {
  //   doc.machinesObj = Machines.find({
  //     routes: { $in: [ doc._id ] }
  //   });
  //   return doc;
  // }
});

Routes.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  },

});


RouteSchema = new SimpleSchema({
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

  machines: {
    type: [String]
  }
});

Routes.attachSchema( RouteSchema );
