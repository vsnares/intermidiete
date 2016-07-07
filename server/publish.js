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

Meteor.publish('routeMachines', function(routeId) {
  return Machines.find({
    routes: {
      $in: [ routeId ]
    }
  });
});

Meteor.publish('machineRoutes', function(machineId) {
  var machine = Machines.findOne({ _id: machineId });
  return Routes.find({
    _id: {
      $in: machine.routes
    }
  });
});
