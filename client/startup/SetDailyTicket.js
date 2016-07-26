Template.SetDailyTicket.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
    self.subscribe('routes');
  });
});

Template.SetDailyTicket.rendered = function() {
  Meteor.typeahead.inject();
};


Template.SetDailyTicket.helpers({
  machine: function() {
    return Machines.find().fetch().map(function(it){ return it.name; });
  }
});
