Template.NewRoute.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
    self.subscribe('routes')
  });
});

Template.NewRoute.helpers({
  machines: ()=> {
    return Machines.find({});
  }
});

Template.NewRoute.events({
  'submit form': function(event, template) {
      event.preventDefault();
      var selected = template.findAll( "input[type=checkbox]:checked");
      var array = _.map(selected, function(item) {
        return item.defaultValue;
      });
      var routeNameVar = event.target.routeName.value;
      Routes.insert({
        name: routeNameVar,
        machines: array
      });
      template.find("form").reset();
    }
});

Template.Routes.helpers({
  routeMachines: function(routeId) {
    return Machines.find({
      rmachines: {
        $in: [ routeId ]
      }
    });
  }
});
