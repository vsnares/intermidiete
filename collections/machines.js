Machines = new Mongo.Collection('machines', {
  // transform: function(doc) {
  //   doc.routesObj = Routes.find({
  //     _id: { $in: [doc.users] }
  //   });
  //   return doc;
  // }
});

Machines.allow({
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

MachineSchema = new SimpleSchema({
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
    Machines.update(id, {
      $set: {
        inMenu: !currentState
      }
    });
  },

  deleteMachine: function(id) {
    Machines.remove(id);
  }
});

Machines.attachSchema( MachineSchema );
