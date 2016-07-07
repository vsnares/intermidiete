Meteor.publish('machines', function(){
  return Machines.find({author: this.userId});
});

Meteor.publish('writers', function(){
  return Writers.find({author: this.userId});
});

Meteor.publish('singleMachine', function(id){
  check(id, String);
  Meteor
  return Machines.find({_id: id});
});

Meteor.publish('writerMachines', function(writerId) {
  return Machines.find({
    writers: {
      $in: [ writerId ]
    }
  });
});

Meteor.publish('machineWriters', function(machineId) {
  var machine = Machines.findOne({ _id: machineId });
  return Writers.find({
    _id: {
      $in: machine.writers
    }
  });
});
