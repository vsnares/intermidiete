Meteor.publish('machines', function(){
  return Machines.find({author: this.userId});
});

Meteor.publish('routes', function(){
  return Routes.find({author: this.userId});
});

Meteor.publish('singleMachine', function(id){
  check(id, String);
  Meteor
  return Machines.find({_id: id});
});

Meteor.publish('singleRoute', function(id){
  check(id, String);
  Meteor
  return Routes.find({_id: id});
});



Meteor.publish('routeMachines', function(routeId) {
  var route = Routes.findOne({ _id: routeId });
  return Machines.find({
    _id: {
      $in: route.machines
    }
  });
});

Meteor.publish('machineRoutes', function(machineId) {
  return Routes.find({
    machines: {
      $in: [ machineId ]
    }
  });
});
